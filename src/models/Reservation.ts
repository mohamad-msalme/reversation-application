import { Property } from './Property'

export interface Reservation {
  _id: string // Example: 507f1f77bcf86cd799439011
  createdAt: Date // Format: Date-time string
  readOnly: true
  checkin: Date // Format: Date-time string
  checkout: Date // Format: Date-time string
  userId: string
  reservationId: string
  email: string
  name: string
  propertyId: string
  updatedAt: Date
  property?: Property
}

export interface SuccessReserveationArrivalsResponse {
  success: {
    reservations: Reservation[]
  }
}
export type ReservationsType = 'arrivals' | 'departures' | 'stayovers'
