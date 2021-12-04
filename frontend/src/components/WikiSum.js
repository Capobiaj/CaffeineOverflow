import React, { useState, useEffect } from 'react';


// Componenet removes html from the summaryhtml part of the 
// microservices JSON response so that it displays only plain
// text. Function uses react useState to store the final summary
// to display. Then uses useEffect and terniary operators to display
// the content when ready. 

export default function WikiSum({infos, term}) {
    const [sum, setSum] = useState([]);

    const displaySum = async () => {
        console.log(typeof term[0])
        console.log(`'''${term[0]}'''`)
        console.log(infos)
        const index = infos.indexOf(`'''${term[0]}'''`)
        const sliced = infos.slice(index)
        const wikiSum = sliced.replaceAll(`'''`, '').replaceAll(`[`, '').replaceAll(`]`, '')
        setSum(wikiSum)
        console.log(sum)
    };

    useEffect(() => {
        displaySum();
    }, []);

    return (
        <>
        <div>
            {sum ?
            <p>{sum}</p>
            : <p>Loading ...</p>}
        </div>
        </>
    )
};