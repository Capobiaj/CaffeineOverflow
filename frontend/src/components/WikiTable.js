import React from 'react';
import WikiSum from '../components/WikiSum';

// Function takes the JSON results from the WikiPage page as a paramater
// and displays them as a response. It passes the summaryhtml section
// of the response to another component to clean the text and only 
// display plain text instead of html. Uses JavaScript terniary operator
// to display Loading... when content isn't recieved yet and then displays
// the content when ready.

export default function WikiTable({infos}) {
    
    return (
        <>
        <h3>{infos.pagetitle}</h3>
        <div>
            <p>Summary:</p>
            { infos.summaryhtml ?
            <WikiSum infos={infos.summaryhtml} term={infos.pagetitle}></WikiSum>
            : <p>Loading...</p>}
        </div>
        <div>
            <p>Relevant Pages:</p>
            <ul>
                {infos.relevantpages ?
                infos.relevantpages.map(page =>
                    <li key={page}>{page}</li>)
                : <li>Loading...</li>}
            </ul>
        </div>
        <div>
            <p>Internal Links:</p>
            <ul>
                {infos.internallinks ?
                infos.internallinks.map(ilink =>
                    <li key={ilink}>{ilink}</li>)
                : <li>Loading...</li>}
            </ul>
        </div>
        <div>
            <p>External Links:</p>
            <ul>
                {infos.externallinks ?
                infos.externallinks.map(elinks => 
                <li key={elinks}>{elinks}</li>)
                : <li>Loading...</li>}
            </ul>
        </div>
        </>
    )
};