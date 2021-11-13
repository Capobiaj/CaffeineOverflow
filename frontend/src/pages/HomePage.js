import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';



export default function HomePage({ setTerm }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [service, setService] = useState('');

    const history = useHistory();
    
    
    const onSubmit = async (event) => {
        event.preventDefault();
        alert(`You entered: ${searchTerm} for ${service}`)
        if (service === "reddit") {
            setTerm(searchTerm)
            history.push("/reddit")
            setSearchTerm('');
        } else {
            setTerm(searchTerm)
            history.push("/wiki")
            setSearchTerm('');
        }
    };



    return (
        <>
            <h1>Geography For You</h1>
            <form onSubmit={onSubmit}>
                <label for="service"> Choose a service:</label>
                <select value={service} onChange={e => setService(e.target.value)}>
                    <option></option>
                    <option value="reddit">Reddit Scraper</option>
                    <option value="wiki">WikiTravel Scraper</option>
                </select>
                <label> Enter a country/city/province/state: </label>
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                    <button>Submit</button>
            </form>

        </>
    )
}
