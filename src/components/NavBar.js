import React, { Component } from 'react';
import '../App.scss';

/* Images */
import logo from '../static/images/contrast-logo.png';
import ninjaCat from '../static/images/ninja.png';

/* Bootstrap */
import Container from 'react-bootstrap/Container';


class NavBar extends Component {
	render() {
		return (
	    <div className="navbar">
	      <Container>
	        <img alt="Constrast Security Logo"
	          src={logo} 
	          className='main-logo'/>
	        <div className="navbar-right">
	          <img alt="Ninja Cat"
	            src={ninjaCat} 
	            className='cat-logo'/>
	          <span className='ctf-label'>CTF Team</span>
	        </div>
	      </Container>
	    </div>
		);
	}
}

export default NavBar;