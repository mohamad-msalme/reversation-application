import React from 'react'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'

const localizer = momentLocalizer(moment)
const CalendarComponent: React.FC = () => {
  return (
    <Calendar
      views={['month', 'week']}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
    />
  )
}

export default CalendarComponent
