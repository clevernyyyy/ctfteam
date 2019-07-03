import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.scss';

import people from '../configs/people';

class ResultBox extends Component {
	static displayName = 'ResultBox';

	static propTypes = {
		eventName: PropTypes.string,
		description: PropTypes.string,
		solves: PropTypes.number,
		place: PropTypes.string,
		dateStart: PropTypes.string,
		dateEnd: PropTypes.string,
		ctfFormat: PropTypes.string,
		url: PropTypes.string,
		participants: PropTypes.array,
		solveHeros: PropTypes.array
	};

	getImage(ele) {
		const imgName = ele.image ? ele.image : 'icon.png';
		const imgUrl = require(`../static/images/${imgName}`);
		return imgUrl;
	}

	render() {
		const participantPhotos = people
			.filter(ele => this.props.participants.includes(ele.id))
			.map((ele, idx) => {
				const imgUrl = this.getImage(ele);
				return (
					<img key={idx}
						className="participant-photos"
						src={imgUrl}
						alt={ele.name} />
				)
			}	
		);
		
		const properEngSolve = this.props.solves === 1 ? 'Solve' : 'Solves';

		return (
	    <div className="result-box">
	    	<div className="box-content">
		    	<div className="event-title-bar">
		    		<div className="event-title">{this.props.eventName}</div>
		    		<div className="event-solves">{`${this.props.solves} ${properEngSolve}`}</div>
		    	</div>
		    	<div className="event-description">{this.props.description}</div>

	    	</div>
	    	<div className="bottom-panel">
	    		<span>{this.props.place}</span>
	    		<span>{participantPhotos}</span>
	    	</div>
	    </div>
		);
	}
}

export default ResultBox;