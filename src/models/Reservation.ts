export interface Reservation {
  _id: string // Example: 507f1f77bcf86cd799439011
  createdAt: Date // Format: Date-time string
  readOnly: true
  checkin: string // Format: Date-time string
  checkout: string // Format: Date-time string
  userId: string
  reservationId: string
  email: string
  name: string
  updatedAt: string
  properties: {
    name: string
    propertyId: string
    status: string
  }[]
}

export interface SuccessReserveationsResponse {
  success: {
    reservations: Reservation[]
  }
}

export interface SuccessReserveationResponse {
  success: {
    reservation: Reservation
  }
}
export type ReservationsType = 'arrivals' | 'departures' | 'stayovers'
