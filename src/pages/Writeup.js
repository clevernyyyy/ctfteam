import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

/* Components */
import CodeBlock from '../components/CodeBlock';

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
	    <Container className='writeup-container'>
	    	<ReactMarkdown 
	    		source={this.state.markdown} 
	    		renderers= {{ code: CodeBlock }}
	    		escapeHtml={false}
	    	/>
	    </Container>
		);
	}
}

export default Writeup;