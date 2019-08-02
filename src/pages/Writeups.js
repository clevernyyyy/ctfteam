import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { PieChart } from 'react-chartkick'
import 'chart.js'
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

import results from '../configs/results';

class Writeups extends Component {
	static displayName = 'Writeups';

	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
	};

	handleClose = () => {
		this.setState({
			showModal: false
		});
	}

	handleOpen = () => {
		console.log('gets to open');
		this.setState({
			showModal: true
		});
	}

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
	    			<span className='solve-points'>{ele.points}</span>
	    			<span className='solve-category'>{ele.challengeCategory}</span>
	    		</div>
    		</a>
	    );
		});
	}

	getPieData() {
		const solves = results.map((ele) => {
			return ele.solveHeros;
		}).flat();

		const groupByCateogry = solves.reduce((objectsByKeyValue, obj) => {
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

		const data = this.getPieData();

		return (
	    <Container>
	    	<div className='column-page'>
	    		<div className='solves'>
	    			<div className='solve-heading-group'>
		    			<div className='solve-heading'>
		    				Team Writeups
		    				<div className='solve-sub-heading'>
		    					(Most recent competitions displayed first)
		    				</div>
		    			</div>
					    <Button className='open-mix' variant="secondary" onClick={this.handleOpen}>
					      View Category Split
					    </Button>
				    </div>
						<Modal show={this.state.showModal} onHide={this.handleClose}>
						  <Modal.Header closeButton>
						    <Modal.Title>Solved Category Split</Modal.Title>
						  </Modal.Header>
						  <Modal.Body>
				    		<div className='graph'>
					    		<PieChart data={data}
					    			className='piegraph'
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
					    			donut
					    			legend='right'/>
				    		</div>
		    			</Modal.Body>
						  <Modal.Footer>
						    <Button variant="secondary" onClick={this.handleClose}>
						      Close
						    </Button>
						  </Modal.Footer>
						</Modal>
		    		<div>{solves}</div>
		    	</div>
	    	</div>
	    </Container>
		);
	}
}

export default Writeups;