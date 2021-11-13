import React from 'react';
import Reddit from './Reddit';


export default function RedditTable({terms}) {
    console.log(terms)
    return (
        <table>
            <thead>
                <tr>
                    <th>Term</th>
                    <th>Frequency</th>
                </tr>
            </thead>
            <tbody>
                {terms.map((item) => (
                <tr key={item.id}>{Object.values(item).map((val) => (<td>{val}</td>))}</tr>))}
            </tbody>
        </table>
    )
};