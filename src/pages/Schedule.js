import React, { Component } from 'react';
import '../App.scss';

/* Bootstrap */
import Container from 'react-bootstrap/Container';

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
			calendarEvents: events
		};
	};

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
		console.log(arg);
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
	    </Container>
	  );
	}
}

export default Schedule;

