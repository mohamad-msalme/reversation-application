import React from 'react'

import { Outlet } from 'react-router-dom'
import { Toolbar } from './components'
import { Loading } from './Loading'
import { useReservationsData } from './useReservationsData'

const CalendarComponent = React.lazy(
  () => import('./components/CalendarComponent')
)

export const Page: React.FC = () => {
  const { propertyId, propertyName } = useReservationsData()

  return (
    <>
      <Toolbar />
      <React.Suspense fallback={<Loading />}>
        <CalendarComponent />
      </React.Suspense>
      <Outlet
        context={{
          propertyId,
          propertyName
        }}
      />
    </>
  )
}
