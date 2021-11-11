export type UserRole = 'public' | 'admin' | 'user' | 'connect'

export interface Hasura {
  'x-hasura-allowed-roles': UserRole[]
  'x-hasura-default-role': UserRole
  'x-hasura-user-id': number | string
  'x-hasura-org-id': number | string
}

export interface JwtUser {
  pab1?: string
  remote_url?: string
  remote_connect?: string
  user: number
  company: number
  owner: boolean
  admin: boolean
  language: {
    user: string
    company: string
  }
  'https://hasura.io/jwt/claims': Hasura
}

export interface CompanyPersona {
  id: number
  name: string
  logo?: string
}

export interface AuthenticatedUser extends JwtUser {
  username: string
  fullName: string
  companyName: string
  imageUrl?: string
  companies: CompanyPersona[]
  companyDateFormat: string
  currency?: string
  timezone: string
}
