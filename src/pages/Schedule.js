import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

import events from '../configs/events';

class Schedule extends Component {
	static displayName = 'Upcoming Schedule';

	constructor(props) {
		super(props);
		this.state = {
			calendarEvents: events,
			showModal: false,
			eventTitle: '',
			startDate: '',
			endDate: '',
			link: '',
			comments: ''
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

	handleDateClick = (arg) => {
		// potentially allow users to add events down the line...
		console.log(arg)
		// if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
		// 	this.setState({
		// 		calendarEvents: this.state.calendarEvents.concat({
		// 			title: 'New Event',
		// 			start: arg.date,
		// 			allDay: arg.allDay
		// 		})
		// 	})
		// }
	};

	handleEventClick = (arg) => {
		// TODO - Open modal with event details
		const title = arg.el.getElementsByClassName('fc-title')[0].innerHTML;

		const event = events.filter((ele) => {
			return ele.title === title;
		})[0];

		const startDate = new Date(event.start).toLocaleString();
		const endDate = new Date(event.end).toLocaleString();

		this.setState({
			showModal: true,
			eventTitle: event.title,
			startDate: startDate,
			endDate: endDate,
			link: event.link,
			comments: event.comments
		});
	};

	render() {
	  return (
	    <Container>
	    	<div className="note">Credentials will <b><em>always</em></b> be found in Slack - not here.</div>
	      <div className="cal-container">
		      <FullCalendar 
		      	defaultView="dayGridMonth"
		      	dateClick={this.handleDateClick}
		      	eventClick={this.handleEventClick}
		      	plugins={[ interactionPlugin, timeGridPlugin, dayGridPlugin ]} 
		      	ref={this.calendarComponentRef}
		      	events={this.state.calendarEvents}
	  				editable
		      />
	      </div>


				<Modal show={this.state.showModal} onHide={this.handleClose}>
				  <Modal.Header closeButton>
				    <Modal.Title>{this.state.eventTitle}</Modal.Title>
				  </Modal.Header>
				  <Modal.Body>
				  	<div className='modal-bod'>
				  		<div className='modal-date'>
					  		<div className='modal-row'>
					  			<span className='modal-sub-header'>Start Date</span>
					  			<span>{this.state.startDate}</span>
					  		</div>
					  		<div className='modal-row'>
					  			<span className='modal-sub-header'>End Date</span>
					  			<span>{this.state.endDate}</span>
					  		</div>
				  		</div>

				  		{this.state.link && <div className='modal-row'>
				  			<span className='modal-sub-header'>URL</span>
				  			<span><a className='modal-link' href={this.state.link}>{this.state.link}</a></span>
				  		</div>}

				  		{this.state.comments && <div className='modal-row'>
				  			<span className='modal-sub-header'>Comments</span>
				  			<span>{this.state.comments}</span>
				  		</div>}
				  	</div>
				  </Modal.Body>
				  <Modal.Footer>
				    <Button variant="secondary" onClick={this.handleClose}>
				      Close
				    </Button>
				  </Modal.Footer>
				</Modal>
	    </Container>
	  );
	}
}

export default Schedule;

