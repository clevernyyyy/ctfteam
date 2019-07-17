import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

import results from '../configs/results';

class Writeups extends Component {
	static displayName = 'Writeups';

	compare(a ,b) {
		if (a > b) return +1;
    if (a < b) return -1;
    return 0;
	}

	createSolveBoxes(solves, eventId) {
		const solvesSorted = solves.sort((a,b) => {
			return this.compare(a.challengeCategory, b.challengeCategory) || this.compare(a.points, b.points) ;
		});

		return solvesSorted.map((ele, idx) => {
			return (
			  <a className='solve-writeup'
    			href={`/writeup/${eventId}/${ele.challengeTitle}`}
	    		key={idx}>
	    		<div className='solve-box'>
	    			<span className='solve-title'>{ele.challengeTitle}</span>
	    			<span className='solve-category'>{ele.challengeCategory}</span>
	    			<span className='solve-points'>{ele.points}</span>
	    		</div>
    		</a>
	    );
		});
	}
	
	render() {
		const solves = results.reverse().map((ele, idx) => {
			const solveBoxes = this.createSolveBoxes(ele.solveHeros, ele.eventId);
			return (
				<div className='solve-group'
					key={idx}>
		    	<div className='solve-ctf-heading'>{ele.eventName}</div>
		    	<div className='solve-boxes'>
		    		{solveBoxes}
		    	</div>
    		</div>
			);
		});

		return (
	    <Container>
	    		<div className='solves'>
	    			<div className='solve-heading'>
	    				Team Writeups
	    				<div className='solve-sub-heading'>
	    					(Most recent competitions displayed first)
	    				</div>
	    			</div>
		    		{solves}
		    	</div>
	    	
	    </Container>
		);
	}
}

export default Writeups;