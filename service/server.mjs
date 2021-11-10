import express from 'express';
import fetch from 'node-fetch';

const app = express();


app.get('/wikiscrape/:name', async function(req, res) {
    let page = req.params.name
    try {
        const response = await fetch(`https://wikitravel.org/wiki/en/api.php?action=query&list=search&srsearch=${page}&format=json`)
        const data = await response.json()
        const hits = data.query.searchinfo.totalhits
        let relevantPages = []
        let exactPage = []
        let keys = data.query.search
        for (let x in keys) {
            relevantPages.append(keys[x])
            if (keys[x].title === page) {
                exactPage.append(keys[x])
            }
        }
        console.log(pageId)
        res.send(data)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})


const port = 8000;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});