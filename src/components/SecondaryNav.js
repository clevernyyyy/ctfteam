import React, { Component } from 'react';
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
					    <Nav.Link href="/">Upcoming Schedule</Nav.Link>
					  </Nav.Item>
					  <Nav.Item as="li">
					    <Nav.Link eventKey="results"
					    	href="/results">Past Results</Nav.Link>
					  </Nav.Item>
					  <Nav.Item as="li">
				    	<Nav.Link href="/writeups"
				    		eventKey="writeups">Writeups</Nav.Link>
					  </Nav.Item>
					  <Nav.Item as="li">
				    	<Nav.Link href="/about"
				    		eventKey="about">About Contrast</Nav.Link>
					  </Nav.Item>
					</Nav>
	      </Container>
	    </div>
		);
	}
}

export default SecondaryNav;