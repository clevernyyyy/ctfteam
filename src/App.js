import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';

/* Components */
import NavBar from './components/NavBar';
import SecondaryNav from './components/SecondaryNav';

/* Pages */
import Schedule from './pages/Schedule';
import Results from './pages/Results';
import Writeups from './pages/Writeups';
import About from './pages/About';
import Bio from './pages/Bio';

function App() {
  return (
    <div className='ctfteam'>
      <NavBar />
        <Router basename={process.env.PUBLIC_URL}>
          <SecondaryNav />
          <div className='content'>
            <Route exact path="/" component={Schedule} />
            <Route path="/results" component={Results} />
            <Route path="/writeups" component={Writeups} />
            <Route path="/about" component={About} />
            <Route path="/bio" component={Bio} />
          </div>
        </Router>
    </div>
  );
}

export default App;