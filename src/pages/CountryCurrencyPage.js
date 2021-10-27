import React from 'react';
import { Link, useParams} from 'react-router-dom';

function CountryCurrencyPage() {
    const { country } = useParams();

    return (
        <>
            <h2>The Currency of {country} is CAD</h2>
            <table>
                
            </table>

            <div id="Links">
                <Link to="/">Homepage</Link><br/>
            </div>
        </>
    ) 
    
}


export default CountryCurrencyPage

