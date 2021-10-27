import React from 'react';
import { Link, useParams} from 'react-router-dom';

function CountryImagePage() {
    const { country } = useParams();

    return (
        <>
            <h2>Images of {country}</h2>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Toronto_%2815085972212%29.jpg/1200px-Toronto_%2815085972212%29.jpg"/>
            <div><button type="button">Next</button></div>
            <div className="Links">
                <Link to="/">Homepage</Link><br/>
            </div>
        </>
    ) 
    
}


export default CountryImagePage
