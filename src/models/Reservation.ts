export interface Reservation {
  _id: string // Example: 507f1f77bcf86cd799439011
  createdAt: string // Format: Date-time string
  readOnly: true
  checkin: string // Format: Date-time string
  checkout: string // Format: Date-time string
  userId: string
  reservationId: string
  email: string
  name: string
}

export interface SuccessReserveationArrivalsResponse {
  success: {
    reservations: Reservation[]
  }
}
