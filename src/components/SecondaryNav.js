import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


class SecondaryNav extends Component {
	render() {
		return (
	    <div className="secondary-nav">
	      <Container>
	      	<Nav defaultActiveKey="/" as="ul">
					  <Nav.Item as="li">
					    <Link to="/">
					    	<Nav.Link href="/">Upcoming Schedule</Nav.Link>
					    </Link>
					  </Nav.Item>
					  <Nav.Item as="li">
					    <Link to="/results">
					    	<Nav.Link eventKey="link-1"
					    		href="results">Past Results</Nav.Link>
					    </Link>
					  </Nav.Item>
					  <Nav.Item as="li">
					    <Link to="/writeups">
					    	<Nav.Link href="writeups"
					    		eventKey="link-2">Writeups</Nav.Link>
					    </Link>
					  </Nav.Item>
					  <Nav.Item as="li">
					    <Link to="/about">
					    	<Nav.Link href="about"
					    		eventKey="link-2">About Contrast</Nav.Link>
					    </Link>
					  </Nav.Item>
					</Nav>
	      </Container>
	    </div>
		);
	}
}

export default SecondaryNav;