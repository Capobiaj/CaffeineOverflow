import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';


// Function uses react useState to grab the inputted term from the form submission
// and then sends it to the appropriate service. It keeps track of the users desired
// service by using a useState variable. useHistory moves the user to the page to
// then display the results from the service.

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
            <div>
                <p>
                    Welcome to my application! This app utilizes two microservices:
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Description</th>
                            <th>Benefits</th>
                            <th>Disadvantages</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Reddit Scraper Service</td>
                            <td>Shows the most frequent terms for a subreddit</td>
                            <td>Loads results quickly, caches previous results for faster access</td>
                            <td>Only shows frequent terms and their frequency</td>
                        </tr>
                        <tr>
                            <td>WikiTravel Scraper Service</td>
                            <td>Shows a summary for a given location and related pages and links</td>
                            <td>Comparatively slower to load results</td>
                            <td>Shows multiple points of interest</td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <form onSubmit={onSubmit}>
                <label for="service"> Choose a service:</label>
                <select value={service} onChange={e => setService(e.target.value)}>
                    <option></option>
                    <option value="reddit">Reddit Scraper</option>
                    <option value="wiki">WikiTravel Scraper</option>
                </select>
                <label> Enter a location: </label>
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                    <button>Submit</button>
            </form>

        </>
    )
}
