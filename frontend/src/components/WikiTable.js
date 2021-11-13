import React from 'react';

export default function WikiTable({infos}) {

    return (
        <>
        <h3>{infos.pagetitle}</h3>
        <div>
            <p>Summary:</p>
            {infos.summaryhtml}
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