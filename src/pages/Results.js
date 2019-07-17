import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

/* Components */
import ResultBox from '../components/ResultBox';

import results from '../configs/results';

class Results extends Component {
	static displayName = 'Results';

	render() {
		const allResults = results.reverse().map((ele, idx) => {
			return (
				<ResultBox key={idx}
					eventName={ele.eventName}
					description={ele.description}
					solves={ele.solves}
					place={ele.place}
					dateStart={ele.dateStart}
					dateEnd={ele.dateEnd}
					ctfFormat={ele.ctfFormat}
					url={ele.url}
					participants={ele.participants}
					solveHeros={ele.solveHeros}
				/>
			);
		})

		return (
      <Container>
      	{allResults}        
      </Container>
		);
	}
}

export default Results;