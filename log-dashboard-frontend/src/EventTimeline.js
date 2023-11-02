import React from 'react';
import { Chrono } from "react-chrono";

const EventTimeline = ({ data }) => {
  const timelineItems = data.map(event => ({
    // convert "hh:mm:ss" to valid date string
    title: new Date(`1970-01-01T${event.event_context.datetime}Z`),
    // title: event.event_context.datetime,
    cardTitle: event.event_context.syscall_name,
    cardSubtitle: `Task Command: ${event.event_context.task_context.task_command}`,
    cardDetailedText: `PID: ${event.event_context.task_context.pid}`,
  }));

  // print out the timelineItems
    console.log(timelineItems);
  return (
    <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
      <Chrono 
        items={timelineItems}
        mode="VERTICAL_ALTERNATING"
        slideShow
        slideItemDuration={4000}
      />
    </div>
  );
};

export default EventTimeline;
