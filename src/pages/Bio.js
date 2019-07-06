import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

import people from '../configs/people';
import results from '../configs/results';

class Bio extends Component {
	static displayName = 'Bios';

	getImage(ele) {
		// grab image if exists
		const imgName = ele.image ? ele.image : 'icon.png';
		const imgUrl = require(`../static/images/${imgName}`);
		return imgUrl;
	}

	getHeroSolves(id, results) {
		// initialize empty array
		let result = [];

		// loop over each ctf played
    results.forEach((ele, idx) => {

    	// filter out ctfs without hero solve
    	let solveHeros = ele.solveHeros.filter((el) => {
    		el['eventName'] = ele.eventName;
    		return el.hero === id;
    	});

    	if (solveHeros.length > 0) {
    		result.push(solveHeros);
    	}

    	// combine all results into single array
    	result = [].concat.apply([], result);
    });

    return result;
	}

	render() {
    const id = this.props.location.search ? parseInt(this.props.location.search.split('?id=')[1], 10) : 0;

    const person = people.filter((ele) => {
      return ele.id === id;
    })[0];

    const imgUrl = this.getImage(person);
    const heroSolves = this.getHeroSolves(id, results);

    const solveBlock = heroSolves.map((ele, idx) => {
    	return (
    		<div className='solve-box'
    			key={idx}>
    			<span className='solve-category'>{ele.challengeCategory}</span>
    			<span className='solve-points'>{ele.points}</span>
    		</div>
    	);
    });

		return (
	    <Container>
	    	<div className='bio-page'>
		    	<div className='bio-box'>
			    	<div className='bio-group'>
				    	<img className='bio-pic'
				    		src={imgUrl}
				    		alt='biopic' />
				    	<div className='bio-text'>
				    		<div className='bio-name'>
				    			{person.name}
				    		</div>
				    		<div className='bio-title'>
				    			{person.title}
				    		</div>
				    		<div className='bio-handle'>
				    			{`Handle: ${person.handle}`}
				    		</div>
			    		</div>
			    		<span className='bio-arrow'></span>
			    	</div>
			    	<div className='bio-description'>
			    		<div className='bio-heading'>Bio</div>
			    		{person.bio}
			    	</div>
		    	</div>
		    	{!!heroSolves.length && <div className='bio-solves'>
		    		<div className='solve-heading'>Solves</div>
		    		<div className='solve-group'>{solveBlock}</div>
		    	</div>}
	    	</div>
	    </Container>
		);
	}
}

export default Bio;