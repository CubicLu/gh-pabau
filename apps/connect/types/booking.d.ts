import { Location } from '../types/locations'
import { Staff } from '../types/staff'
import { Service } from '../types/services'

export interface BookingData {
  masterCategoryID?: number
  categoryID?: number
  serviceID?: number[]
  services: Service[]
  employeeID?: number
  staffID: number
  employee: Staff
  locationID?: number
  location: Location
  dateTime?: moment.Moment
  peopleCount: number
}
