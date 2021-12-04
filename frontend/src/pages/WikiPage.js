import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WikiTable from '../components/WikiTable';

// Function takes term as an input which is the term that the user had submitted
// on the form submission from the HomePage. Function uses axios to get the results
// from the WikiTravel Scraper Service for the given term. Function then uses useState
// to store the JSON response and useEffect to update the page. Function then passes the
// wiki variable to the WikiTable component to display results

export default function WikiPage({ term }) { 
    const [wiki, setWiki] = useState([]);

    const displayWiki = async () => {
        console.log(term)
        const response = await axios.get(`http://localhost:8000/wikiscrape/${term}`)
        if (response.status === 200) {
            setWiki(response.data)
        }
        else {
            alert('Unable to find a page for the term you entered.')
        }
    };

    useEffect(() => {
        displayWiki();
    }, []);


    return (
        <>
        <h1>Wiki Scraper Service</h1>
        <WikiTable infos={wiki}></WikiTable>
        <Link to="/">Return to the HomePage</Link>
        </>
    )
};