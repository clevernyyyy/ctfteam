import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

class Writeup extends Component {
	static displayName = 'Writeup';

	constructor(props) {
		super(props);
		this.state = {
			markdown: ''
		};
	};

	componentDidMount() {
    const eventId = this.props.location.pathname ? parseInt(this.props.location.pathname.split('/')[2]) : 0;
    const challengeTitle = this.props.location.pathname ? this.props.location.pathname.split('/')[3] : 0;
		const reactPath = require(`../writeups/${eventId}/${challengeTitle}.md`);

		// require.context('../writeups/', true, /\.png$/);

		// let testImageArray = [];
		// const imagePathArray = ['../writeups/2/bingo.png', '../writeups/2/facebookflag.png'];

		// imagePathArray.forEach((ele, idx) => {
		// 	let x = require(ele);
		// 	testImageArray[idx] = x;
		// });

		// console.log(testImageArray);

		// const imgUrl = require(`../writeups/2/bingo.png`);

		fetch(reactPath)
			.then(response => {
				return response.text();
			})
			.then(text => {
				this.setState({
					markdown: text
				});
			});
	}
	
	render() {
		const ReactMarkdown = require('react-markdown/with-html');

		return (
	    <Container>
	    	<ReactMarkdown 
	    		source={this.state.markdown} 
	    		escapeHtml={false}
	    	/>
	    </Container>
		);
	}
}

export default Writeup;