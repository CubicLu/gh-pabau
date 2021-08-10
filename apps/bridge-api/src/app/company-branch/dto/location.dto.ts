export interface EmployeeList {
  id: number
  name: string
}
export interface BadgesList {
  icon: string
  name: string
}

export interface CreateBranchInputType {
  id?: number
  street: string
  bookable: number
  lng: number
  city: string
  name: string
  postcode: string
  phone: string
  showOnline: number
  hasCalender: number
  region: string
  address: string
  country: string
  website: string
  isActive: number
  email: string
  lat: number
  color: string
  sendConfEmil: number
  onlineBooking: number
  customId: string
  image: string
  employees?: EmployeeList[]
  badges?: BadgesList[]
}

export interface UpdateBranchInputType extends CreateBranchInputType {
  id: number
}

export interface CreateBranchResponseType {
  id: number
}

export interface UpdateBranchResponseType {
  affected_row: number
}

export interface CompanyBranchLastOrder {
  loc_order: number
}
