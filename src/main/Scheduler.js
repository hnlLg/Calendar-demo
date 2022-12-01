import React from 'react'
import SchedulerComponent from '../components/SchedulerComponent'
import { defaultProps } from '../context/CalendarContext';
import CalendarProvider from '../context/CalendarProvider'

const Scheduler = (props) => (
  <CalendarProvider initial={props}>
    <SchedulerComponent />
  </CalendarProvider>
)

Scheduler.defaultProps = defaultProps;
export default Scheduler