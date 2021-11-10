import express from 'express';
import fetch from 'node-fetch';
import {htmlToText} from 'html-to-text';

const app = express();

// GET Request for WikiTravel API
/**
 * Fetches api and gets results for the name parameter in the
 * get request. If there is an exact match, it will identify it
 * and run analytics on it.
 */
app.get('/wikiscrape/:name', async function(req, res) {
    let page = req.params.name
    try {
        const response1 = await fetch(`https://wikitravel.org/wiki/en/api.php?action=query&list=search&srsearch=${page}&format=json`)
        const response1data = await response1.json()
        let data = {}
        let relevantPages = []
        let exactPage = []
        let pageText = []
        let keys = response1data.query.search
        for (let x in keys) {
            if (keys[x].title === page) {
                exactPage.push(keys[x])
            }else {
                relevantPages.push(keys[x].title)
            }
        }
        data['pagetitle'] = exactPage
        data['totalhits'] = response1data.query.searchinfo.totalhits
        data['relevantpages'] = relevantPages
        if (exactPage.length !== 0) {
            const responseHTML = await fetch(`https://wikitravel.org/wiki/en/api.php?action=parse&page=${page}&prop=text&format=json`)
            const responseHTMLdata = await responseHTML.json()
            let pageHTML = responseHTMLdata.parse.text['*']
            pageText.push(htmlToText(pageHTML))
            data['html'] = pageHTML
            data['text'] = pageText
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