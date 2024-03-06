import { Reservation, ReservationsType } from 'models/Reservation'
import React, { useContext } from 'react'

type ReservationCardContextProps = {
  reservation: Reservation | null
  isLoading?: boolean
  type: ReservationsType
}
const ReservationCardContext = React.createContext<ReservationCardContextProps>(
  { reservation: null, type: 'arrivals' }
)

export const useReservationCard = () => useContext(ReservationCardContext)

type ReservationCardContextProviderProps =
  React.PropsWithChildren<ReservationCardContextProps>

export const ReservationCardContextProvider: React.FC<
  ReservationCardContextProviderProps
> = ({ children, ...context }) => (
  <ReservationCardContext.Provider value={context}>
    {children}
  </ReservationCardContext.Provider>
)
