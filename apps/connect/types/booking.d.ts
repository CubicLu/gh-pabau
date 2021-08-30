import { Location } from '../types/locations'
import { Staff } from '../types/staff'
import { Service } from '../types/services'

export interface BookingData {
  masterCategoryID?: number
  categoryID?: number
  services: Service[]
  employee?: Staff
  location?: Location
  dateTime?: moment.Moment
  peopleCount: number
}
