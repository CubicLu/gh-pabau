import { Location } from '../types/locations'
import { Staff } from '../types/staff'
import { Service } from '../types/services'
import { Contact } from '../types/contact'
import { moment } from 'moment'

export interface BookingData {
  masterCategoryID?: number
  categoryID?: number
  services: Service[]
  employee?: Staff
  location?: Location
  dateTime?: moment.Moment
  peopleCount: number
  totalCost: number
  members?: Contact[]
}
