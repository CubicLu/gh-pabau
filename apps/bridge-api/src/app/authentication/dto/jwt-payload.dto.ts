type UserRole = 'public' | 'admin' | 'user'

interface Hasura {
  'x-hasura-allowed-roles': UserRole[]
  'x-hasura-default-role': UserRole
  'x-hasura-user-id': number | string
  'x-hasura-org-id': number | string
  'x-hasura-james'?: number | string
}

export interface JwtPayloadDto {
  user: number
  company: number
  admin?: boolean
  owner?: boolean
  remote_url: string
  remote_connect: string
  'https://hasura.io/jwt/claims': Hasura
}
