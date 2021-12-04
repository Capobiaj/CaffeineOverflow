import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

// GET Request for WikiTravel API
/**
 * Fetches api and gets results for the name parameter in the
 * get request. If there is an exact match, it will identify it
 * and return a JSON response.
 * 
 * JSON RESPONSE:
 * pagetitle: NAME OF PAGE
 * relevantpages: ALL PAGES WITH SAME NAME IN TITLE
 * externallinks: ALL EXTERNAL LINKS LISTED ON PAGE 
 * internallinks: ALL INTERNAL LINKS LISTED ON PAGE (How to link? - URL = https://wikitravel.org/en/{LINK} (SPACES = _) )
 * summaryHTML: INTRODUCTION SECTION OF PAGE (~ 1 Paragraph) in HTML
 * 
 */
app.get('/wikiscrape/:name', async function(req, res) {
    let page = req.params.name
    console.log(page)
    try {
        const response1 = await fetch(`https://wikitravel.org/wiki/en/api.php?action=query&list=search&srsearch=${page}&format=json`)
        const response1Data = await response1.json()
        let data = {}
        let relevantPages = []
        let exactPage = []
        let pageId = 0
        let keys = response1Data.query.search
        for (let x in keys) {
            if (keys[x].title === page) {
                exactPage.push(keys[x].title)
                pageId += keys[x].pageid
            }else {
                relevantPages.push(keys[x].title)
            }
        }
        // validates that there is an exact match for the page
        if (exactPage.length !== 0) {

            // grabs summary section (section 0) as HTML. HTML is in summaryHTML
            const responseHTML = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=wikitext&section=0&format=json`)
            const responseHTMLData = await responseHTML.json()
            let summaryHTML = responseHTMLData.parse.wikitext['*']
            

            // grabs external links puts them in extLinks variable
            // grabs internal links and puts them in intLinks variable
            let extLinks = []
            let intLinks = []
            const responseLinks = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=links|externallinks&format=json`)
            const responseLinksData = await responseLinks.json()
            extLinks.push(responseLinksData.parse.externallinks)
            for (let z = 1; z < responseLinksData.parse.links.length - 4; z++) {
                intLinks.push(responseLinksData.parse.links[z]["*"])
            };
            
            
            // creates response json by adding key value pairs to data object
            data['pagetitle'] = exactPage
            data['relevantpages'] = relevantPages
            data['externallinks'] = extLinks[0]
            data['internallinks'] = intLinks
            data['summaryhtml'] = summaryHTML
            
            // sends data object as the json response
            res.status(200)
            res.send(data)

        } else {
            data['page'] = 'Unable to find exact page - consider inputting one of the relevant pages instead'
            data['totalhits'] = response1data.query.searchinfo.totalhits
            data['relevantpages'] = relevantPages
            res.status(404)
            res.send(data)
        }
    } catch (error) {
        console.log(error);
    }
})


const port = 8000;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});