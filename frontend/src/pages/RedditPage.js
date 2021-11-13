import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import RedditTable from '../components/RedditTable';

export default function RedditPage({ term }) { 
    const [reddit, setReddit] = useState([]);

    const displayReddit = async () => {
        console.log(term)
        const response = await axios.get(`http://localhost:5001/${term}/hot`)
        setReddit(response.data)
    };

    useEffect(() => {
        displayReddit();
    }, []);

    
    return(
        <>
            <h1>Reddit Scraper Service</h1>
            <RedditTable terms={reddit}></RedditTable>
            <Link to="/">Return to the HomePage</Link>
        </>
    )
}