import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import RedditTable from '../components/RedditTable';


// Function takes term as an input which is the term that the user had submitted
// on the form submission from the HomePage. Function uses axios to get the results
// from the Reddit Scraper Service for the given term. Function then parses the JSON 
// string response before using useState to store JSON results from Reddit Scraper Service.
// Function utilizes useEffect to update the page. Passes useState variable (reddit) to
// RedditTable component to display results.

export default function RedditPage({ term }) { 
    const [reddit, setReddit] = useState([]);
    console.log(reddit)

    const displayReddit = async () => {
        console.log(term)
        const response = await axios.get(`http://localhost:5001/${term}/hot`)
        if (response.status === 200) {
            const parsed = JSON.parse(response.data)
            setReddit(parsed)
        } else {
            alert('Unable to find a subreddit for the term you entered.')
        }
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