import express from 'express';
import fetch from 'node-fetch';
import {htmlToText} from 'html-to-text';

const app = express();

// GET Request for WikiTravel API
/**
 * Fetches api and gets results for the name parameter in the
 * get request. If there is an exact match, it will identify it
 * and return a JSON response.
 * 
 * JSON RESPONSE:
 * pagetitle: NAME OF PAGE
 * relevantpages: ALL PAGES WITH SAME NAME IN TITLE
 * images: ALL IMAGES LISTED ON PAGE (How to view? - URL = https://wikitravel.org/en/File:{IMAGE NAME})
 * externallinks: ALL EXTERNAL LINKS LISTED ON PAGE 
 * internallinks: ALL INTERNAL LINKS LISTED ON PAGE (How to link? - URL = https://wikitravel.org/en/{LINK} (SPACES = _) )
 * summaryHTML: INTRODUCTION SECTION OF PAGE (~ 1 Paragraph) in HTML
 * summaryText: INTRODUCTION SECTION OF PAGE (~ 1 Paragraph) in plain text
 * understandHTML: UNDERSTAND SECTION OF PAGE (if it exists) (Multiple paragraphs) in HTML
 * understandText: UNDERSTAND SECTION OF PAGE (if it exists) (Multiple paragraphs) in plain text
 * 
 */
app.get('/wikiscrape/:name', async function(req, res) {
    let page = req.params.name
    try {
        const response1 = await fetch(`https://wikitravel.org/wiki/en/api.php?action=query&list=search&srsearch=${page}&format=json`)
        const response1data = await response1.json()
        let data = {}
        let relevantPages = []
        let exactPage = []
        let pageId = 0
        let keys = response1data.query.search
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

            // grabs summary section (section 0) as HTML and plain text. HTML is in summaryHTML and plain text is in summaryText
            let summaryText = []
            const responseHTML = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=wikitext&section=0&format=json`)
            const responseHTMLData = await responseHTML.json()
            let summaryHTML = responseHTMLData.parse.wikitext['*']
            summaryText.push(htmlToText(summaryHTML))
            
            // grabs images
            let images = []
            const responseImages = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=images&format=json`)
            const responseImagesData = await responseImages.json()
            for (let w in responseImagesData.parse.images) {
                images.push(responseImagesData.parse.images[w])
            }
            

            // grabs external links puts them in extLinks variable
            let extLinks = []
            const responseExtLinks = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=externallinks&format=json`)
            const responseExtLinksData = await responseExtLinks.json()
            for (let v in responseExtLinksData.parse.externallinks) {
                extLinks.push(responseExtLinksData.parse.externallinks[v])
            }

            // grabs internal links and puts them in intLinks variable
            let intLinks = []
            const responseIntLinks = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=links&format=json`)
            const responseIntLinksData = await responseIntLinks.json()
            for (let z in responseIntLinksData.parse.links) {
                intLinks.push(responseIntLinksData.parse.links[z]["*"])
            }

            // grabs sections to find the index for the understand section. Places the index number in understand variable
            let understand = 0
            const responseSections = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=sections&format=json`)
            const responseSectionsData = await responseSections.json()
            for (let y in responseSectionsData.parse.sections) {
                if (responseSectionsData.parse.sections[y].line === "Understand") {
                    understand += responseSectionsData.parse.sections[y].index
                }
            }
            
            // grabs Understand section as HTML and plain text based on section index from understand variable. HTML is in understandHTML and plain text is in understandText
            let understandText = []
            const responseUnderstand = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=wikitext&section=${understand}&format=json`)
            const responseUnderstandData = await responseUnderstand.json()
            let understandHTML = responseUnderstandData.parse.wikitext['*']
            understandText.push(htmlToText(understandHTML))
            
            
            // creates response json by adding key value pairs to data object
            data['pagetitle'] = exactPage
            data['relevantpages'] = relevantPages
            data['images'] = images
            data['externallinks'] = extLinks
            data['internallinks'] = intLinks
            data['summaryhtml'] = summaryHTML
            data['summarytext'] = summaryText
            data['understandhtml'] = understandHTML
            data['understandtext'] = understandText
            
            // sends data object as the json response
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