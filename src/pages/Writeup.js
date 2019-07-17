import React, { Component } from 'react';
import '../App.scss';

import people from '../configs/people';
import results from '../configs/results';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

/* Components */
import CodeBlock from '../components/CodeBlock';

class Writeup extends Component {
	static displayName = 'Writeup';

	constructor(props) {
		super(props);
		this.state = {
			markdown: '',
			eventId: 0,
			challengeTitle: '',
			heros: [0]
		};
	};

	componentWillMount() {
    const eventId = this.props.location.pathname ? parseInt(this.props.location.pathname.split('/')[2]) : 0;
    const challengeTitle = this.props.location.pathname ? this.props.location.pathname.split('/')[3] : 0;
		const reactPath = require(`../writeups/${eventId}/${challengeTitle}.md`);

		const event = results.filter(ele => ele.eventId === eventId)[0];
		const heros = event.solveHeros.filter(ele => ele.challengeTitle === challengeTitle)[0].hero;

		this.setState({
			heros: heros
		});

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

	getImage(ele) {
		const imgName = ele.image ? ele.image : 'icon.png';
		const imgUrl = require(`../static/images/${imgName}`);
		return imgUrl;
	}

	render() {
		const ReactMarkdown = require('react-markdown/with-html');

		const heroTitle = this.state.heros.length > 1 ? 'Heros' : 'Hero';

		const participantPhotos = people
			.filter(ele => this.state.heros.includes(ele.id))
			.map((ele, idx) => {
				const imgUrl = this.getImage(ele);
				return (
					<a key={idx}
						className="photo-links"
						href={`/bio?id=${ele.id}`}>
						<img className="participant-photos"
							src={imgUrl}
							alt={ele.name} />
					</a>
				)
			}	
		);
		
		return (
	    <Container className='writeup-container'>
	    	<div className='write-heros'>
	    		<div className='hero-title'>{heroTitle}</div> 
	    		<div className='hero-pics'>{participantPhotos}</div>
	    	</div>
	    	<div className='markdown'>
		    	<ReactMarkdown 
		    		source={this.state.markdown} 
		    		renderers= {{ code: CodeBlock }}
		    		escapeHtml={false}
		    	/>
	    	</div>
	    </Container>
		);
	}
}

export default Writeup;