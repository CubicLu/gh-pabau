export interface JwtCmStaffGeneral {
  CellPhone: string
}
export interface JwtCompanyDetails {
  admin: number
  enable_2fa: number
  language: string
}
export interface JwtCompany {
  details?: JwtCompanyDetails
  admin: number
  remote_url: string
  remote_connect: string
}
export interface JwtUser {
  id: number
  username: string
  company_id: number
  admin: number
  locale: string
  company: JwtCompany
  CmStaffGeneral?: JwtCmStaffGeneral
}
