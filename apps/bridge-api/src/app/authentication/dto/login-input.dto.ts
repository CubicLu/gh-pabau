export interface LoginInputDto {
  username: string
  password: string
  company_id?: number
}

export interface JwtCmStaffGeneral {
  CellPhone: string
}
export interface JwtCompanyDetails {
  admin: number
  enable_2fa: number
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
  company: JwtCompany
  CmStaffGeneral?: JwtCmStaffGeneral
}
