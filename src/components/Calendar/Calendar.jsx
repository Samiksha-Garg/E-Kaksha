import React from "react";
import { Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";

import events from "./events";
// import Event from "./Event";
import EventWrapper from "./EventWrapper";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

export default function  CalendarView() {
    return (

    <Calendar
    localizer={localizer}
      components={{
        eventWrapper: EventWrapper,
        // event: Event
      }}
    style ={{height : '100vh', width : '100%'}}
      defaultDate={new Date(2018, 3, 27)}
      defaultView="day"
      events={events}
      views={allViews}
    />
  );
} 