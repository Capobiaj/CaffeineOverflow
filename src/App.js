import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CountryInfoPage from './pages/CountryInfoPage';
import CountryCurrencyPage from './pages/CountryCurrencyPage';
import CountryImagePage from './pages/CountryImagePage';

//** */
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage/>
          </Route>
          <Route path="/info/:country" >
            <CountryInfoPage/>
          </Route>
          <Route path="/currency/:country">
            <CountryCurrencyPage/>
          </Route>
          <Route path="/images/:country">
            <CountryImagePage/>
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
