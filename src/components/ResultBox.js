import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.scss';

class ResultBox extends Component {
	static displayName = 'ResultBox';

	static propTypes = {
		content: PropTypes.node
	};

	render() {
		return (
	    <div className="result-box">
	    	{this.props.content}
	    </div>
		);
	}
}

export default ResultBox;