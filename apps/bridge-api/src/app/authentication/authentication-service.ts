import jwt from 'jsonwebtoken'
import { JwtUser } from '@pabau/yup'

interface AuthenticatedUser {
  Company: {
    details: { language: string }
    id: number
    admin: number
    remote_connect: string
    remote_url: string
  }
  id: number
  username: string
  hash: string
  admin: number
  locale: string
  password_algor: number
  password: string
  salt: string
}

export const generateJWT = (user: AuthenticatedUser): string => {
  const jwtObjectToSign: JwtUser = {
    pab1: generatePab1JWT(user),
    remote_url: user.Company.remote_url,
    remote_connect: user.Company.remote_connect,
    user: user.id,
    company: user.Company.id,
    admin: Boolean(user.admin) ?? false,
    owner: user.id === user.Company.admin,
    language: {
      user: user.locale,
      company: user.Company?.details?.language,
    },
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['public', 'user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': user.id.toString(),
      'x-hasura-org-id': user.Company.id.toString(),
    },
  }
  return jwt.sign(jwtObjectToSign, process.env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: '30d',
    notBefore: -60,
  })
}

/* Legacy */
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
    { algorithm: 'HS512', expiresIn: '30d', notBefore: -60 }
  )
}
