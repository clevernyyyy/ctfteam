import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

/* Components */
import ResultBox from '../components/ResultBox';

import results from '../configs/results.json';

class Results extends Component {
	render() {

		const test = results.map((ele, idx) => {
			return (
				<ResultBox
					content={ele.name}>
				</ResultBox>
			);
		})


		return (
      <Container>
      	{test}        
      </Container>
		);
	}
}

export default Results;