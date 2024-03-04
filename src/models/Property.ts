export type PropertyType = 'public' | 'private' | 'all'
export interface PropertyAddress {
  city: string
  country: string
}

export interface Property {
  _id: string
  userId: string
  address: PropertyAddress
  phone: string
  name: string
  serialNumber: string
  createdAt: Date
  updatedAt: Date
  __v: number
  type: PropertyType
}

export interface SuccessPropertiesResponse {
  success: {
    properties: Property[]
  }
}

export interface SuccessPropertyResponse {
  success: {
    property: Property
  }
}
