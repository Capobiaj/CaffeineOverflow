import React from 'react';
import Reddit from './Reddit';


export default function RedditTable({terms}) {

    return (
        <>
            <div>
                <p>Most Frequent Terms:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Term</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {terms ?
                        terms.map((term, i) =>
                        <Reddit change={term} key={i}/>)
                        : <tr><td>...Loading</td><td>Loading...</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
        
)
};