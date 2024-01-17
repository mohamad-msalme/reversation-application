export interface ReservationAddress {
  country: string
  stateOrProvince: string
  city: string
  area: string
}

export interface Reservation {
  _id: string
  createdAt: Date
  phone: string
  address: ReservationAddress
  name: string
  serialNumber: string
}
