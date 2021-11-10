import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function HomePage() {
    const [country, setCountry] = useState('');
    
    return (
        <>
            <h1>Geography For You</h1>
            <form>
                <label> Enter a country: 
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)}/>
                </label>
            </form>
            <div className="Links">
                <Link to={{pathname: `/info/${country}`}}>Information</Link><br/>
                <Link to={{pathname: `/currency/${country}`}}>Currency</Link><br/>
                <Link to={{pathname: `/images/${country}`}}>Images</Link>
            </div>
        </>
    )
};

export default HomePage;