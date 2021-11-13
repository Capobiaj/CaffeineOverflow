import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import WikiTable from '../components/WikiTable';

export default function WikiPage({ term }) { 
    const [wiki, setWiki] = useState([]);

    const displayWiki = async () => {
        console.log(term)
        const response = await axios.get(`http://localhost:8000/wikiscrape/${term}`)
        setWiki(response.data)
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