import React from 'react'
import moment from 'moment'

import { useReservationsData } from '../useReservationsData'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useNavigate, useSearchParams } from 'react-router-dom'

const localizer = momentLocalizer(moment)
const CalendarComponent: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { reservations } = useReservationsData()
  return (
    <Calendar
      views={['month']}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      onNavigate={newDate => {
        searchParams.set('month', newDate.getMonth().toString())
        searchParams.set('year', newDate.getFullYear().toString())
        setSearchParams(searchParams)
      }}
      events={reservations.map(reservation => ({
        start: new Date(reservation.checkin),
        end: new Date(reservation.checkout),
        id: reservation._id,
        title: reservation.name
      }))}
      onSelectEvent={reservation => {
        navigate(`${reservation.id}?${searchParams.toString()}`)
      }}
    />
  )
}

export default CalendarComponent
