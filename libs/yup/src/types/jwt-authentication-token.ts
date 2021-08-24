import { RetrieveAuthenticatedUserQuery } from '@pabau/graphql'

type UserRole = 'public' | 'admin' | 'user' | 'connect'

interface Hasura {
  'x-hasura-allowed-roles': UserRole[]
  'x-hasura-default-role': UserRole
  'x-hasura-user-id': number | string
  'x-hasura-org-id': number | string
  'x-hasura-james'?: number | string
}

export interface JwtAuthenticationToken {
  user: number
  company: number
  admin?: boolean
  username?: string
  owner?: boolean
  remote_url: string
  language?: {
    user: string
    company: string
  }
  remote_connect: string
  'https://hasura.io/jwt/claims': Hasura
}

export type FullAuthenticationUser = JwtAuthenticationToken &
  Partial<RetrieveAuthenticatedUserQuery['me']>
