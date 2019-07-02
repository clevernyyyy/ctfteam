import React from 'react';
import '../App.scss';
import "react-big-calendar/lib/css/react-big-calendar.css";

/* Bootstrap */
import Container from 'react-bootstrap/Container';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import events from '../configs/events.js';
// import dates from '../configs/dates';

let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })


function Schedule() {

	// const { localizer } = this.props;

	// Setup the localizer by providing the moment (or globalize) Object
	// to the correct localizer.
	const localizer = momentLocalizer(moment);
  
  return (
    <Container>
    	<Calendar
		    events={events}
		    views={allViews}
		    step={60}
		    showMultiDayTimes
		    defaultDate={new Date(2015, 3, 1)}
		    components={{
		      timeSlotWrapper: ColoredDateCellWrapper,
		    }}
		    localizer={localizer}
	    />
    </Container>
  );
}

export default Schedule;

