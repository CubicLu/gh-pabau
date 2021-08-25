export interface User {
  id: number
  full_name: string
  pab1?: string
  admin: number
  company: Company
  timezone: string
  image?: string
  companies: RelatedCompanies[]
}

export interface Company {
  id: number
  remote_url: string
  details: {
    company_name: string
    language: string
    currency: string
  }
}

export interface RelatedCompanies {
  id: number
  name: string
  logo: string
}
