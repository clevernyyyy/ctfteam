import React, { Component } from 'react';
import { PieChart } from 'react-chartkick'
import 'chart.js'
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import people from '../configs/people';
import results from '../configs/results';

class Bio extends Component {
	static displayName = 'Bios';

	compare(a ,b) {
		if (a > b) return +1;
    if (a < b) return -1;
    return 0;
	}

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
    		el['eventId'] = ele.eventId;
    		return el.hero.includes(id);
    	});

    	if (solveHeros.length > 0) {
    		result.push(solveHeros);
    	}

    	// combine all results into single array
    	result = [].concat.apply([], result);
    });

		const solvesSorted = result.sort((a,b) => {
			return this.compare(a.challengeCategory, b.challengeCategory) || this.compare(a.points, b.points) ;
		});

    return solvesSorted;
	}

	getPieData(heroSolves) {
		const groupByCateogry = heroSolves.reduce((objectsByKeyValue, obj) => {
	    const value = obj['challengeCategory'];
	    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
	    return objectsByKeyValue;
	  }, {});

		const categoryCount = Object.keys(groupByCateogry).map((ele) => {
			return [ele, groupByCateogry[ele].length];	
		})

		return categoryCount;
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
    		<a className='solve-writeup'
    			href={`/writeup/${ele.eventId}/${ele.challengeTitle}`}
	    		key={idx}>
	    		<OverlayTrigger placement='top'
	    			overlay={
	    				<Tooltip id={`tooltip-top`}>
	    					{ele.eventName}
	    				</Tooltip>
	    			}
	    		>
		    		<div className='solve-box'>
		    			<span className='solve-title'>{ele.challengeTitle}</span>
		    			<span className='solve-category'>{ele.challengeCategory}</span>
		    			<span className='solve-points'>{ele.points}</span>
		    		</div>
	    		</OverlayTrigger>
    		</a>
    	);
    });

		const data = this.getPieData(heroSolves);

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
		    	{!!heroSolves.length && <div className='bio-right'>
			    	<div className='bio-solves'>
			    		<div className='solve-heading'>Solves</div>
			    		<div className='solve-group'>{solveBlock}</div>
			    	</div>
			    	<div className='bio-pie'>
			    		<div className='solve-heading'>Solve Distribution</div>
				    	<div className='graph'>
				    		<PieChart data={data}
				    			colors={[
				    				'#6195ED',			// cornflower-blue
				    				'#ED8261',			// burnt-sienna
				    				'#C361ED',			// heliotrope
				    				'#52c0b0',			// fountain-blue
				    				'#ED3574',			// violet-red
				    				'#89ED35',			// inch-worm
				    				'#EDD335',			// golden-dream
				    				'#FF5733',
				    				'#33FFA2',
				    				'#5833FF',
				    				'#33D4FF',
				    				'#9933FF',
				    				'#FFE333',
				    				'#FF3380'
				    			]}
				    			width='350px'
				    			height='200px'
				    			donut
				    			legend='right'/>
			    		</div>
			    	</div>
		    	</div>}
	    	</div>
	    </Container>
		);
	}
}

export default Bio;