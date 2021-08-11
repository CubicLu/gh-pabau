import { Company, User, CompanyDetails } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { JwtPayloadDto } from './dto'

export type AuthenticatedUser = Pick<
  User,
  | 'id'
  | 'username'
  | 'password'
  | 'password_algor'
  | 'salt'
  | 'hash'
  | 'admin'
  | 'locale'
> & {
  Company?: Pick<Company, 'id' | 'admin' | 'remote_url' | 'remote_connect'> & {
    details: Pick<CompanyDetails, 'language'> | null
  }
}

export const generateJWT = (user: AuthenticatedUser): string => {
  return jwt.sign(
    {
      pab1: generatePab1JWT(user),
      remote_url: user.Company.remote_url,
      remote_connect: user.Company.remote_connect,
      username: user.username,
      user: user.id,
      company: user.Company.id,
      admin: Boolean(user.admin) ?? false,
      owner: user.id === user.Company.admin ?? false,
      language: {
        user: user.locale,
        company: user.Company?.details?.language,
      },
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['public', 'user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id.toString(),
        'x-hasura-org-id': user.Company.id.toString(),
        'x-hasura-pabau': 'test',
      },
    } as JwtPayloadDto,
    process.env.JWT_SECRET,
    { algorithm: 'HS512' }
  )
}

const generatePab1JWT = ({
  id,
  Company: { id: companyId },
}: AuthenticatedUser): string => {
  return jwt.sign(
    {
      u: id,
      c: companyId,
    },
    process.env.JWT_PAB1_TOKEN,
    { algorithm: 'HS512' }
  )
}
