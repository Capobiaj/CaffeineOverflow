import React from 'react';


export default function Reddit({change}) {
    return (
        <tr>
            <td>{change.Term}</td>
            <td>{change.Frequency}</td>
        </tr>
    )
};