import { Property } from 'models/Property'

export const PROPERTY_TYPES: Property['type'][] = ['public', 'private', 'all']
export const HOME_TABS: Record<number, string> = {
  0: '/home/arrivals',
  1: '/home/departure',
  2: '/home/staysover'
}
