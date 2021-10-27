import React, { useState } from 'react';
import { Link, useParams} from 'react-router-dom';

function CountryCurrencyPage() {
    const { country } = useParams();
    const [currency, setCurrency] = useState('');
    const USD_CAD = 1.24
    const CAD_USD = 0.8
    let exchange = currency * CAD_USD

    return (
        <>
            <h2>The Currency of {country} is CAD</h2>
            <table>
                <thead>
                    <th>CAD</th>
                    <th className="dropdown">
                        <label for="currencies">Choose a car:</label>
                            <select id="currencies" name="currencies">
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                                <option value="EUR">EUR</option>
                                <option value="CNY">CNY</option>
                            </select>
                    </th>
                </thead>
                <tbody>
                    <td><input type="number" value={currency} onChange={e => setCurrency(e.target.value)}></input></td>
                    <td>{exchange}</td>
                </tbody>
            </table>

            <div className="Links">
                <Link to="/">Homepage</Link><br/>
            </div>
        </>
    ) 
    
}


export default CountryCurrencyPage

