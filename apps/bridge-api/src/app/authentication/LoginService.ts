import { LoginInputDto, JwtPayloadDto } from './dto'
import { User } from '../../generated/schema'
import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'

const generateHash = (password: string, encryption: 'md5' | 'sha1'): string => {
  return createHash(encryption).update(password).digest('hex')
}

const generatePassword = (user: User, args: LoginInputDto): string => {
  switch (user.password_algor) {
    case 1:
      return generateHash(args.password, 'md5')
    case 2:
      return generateHash(user.salt + args.password + user.salt, 'sha1')
    default:
      throw new Error('Password algorithm not supported')
  }
}

export const verifyUser = (users: User[], args: LoginInputDto): User => {
  if (Number(args.company_id)) {
    return users.find(
      (currentUser) =>
        currentUser.password === generatePassword(currentUser, args) &&
        currentUser.company_id === args.company_id
    )
  }

  return users.find(
    (currentUser) =>
      currentUser.password === generatePassword(currentUser, args)
  )
}

export const authenticateUser = (user: User): string => {
  return jwt.sign(
    {
      user: user.id,
      company: user.company_id,
      admin: Boolean(user.admin) ?? false,
      owner: user.id === user.company.admin ?? false,
      remote_url: user.company.remote_url,
      remote_connect: user.company.remote_connect,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['public', 'user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id.toString(),
        'x-hasura-org-id': user.company_id.toString(),
        'x-hasura-pabau': 'test',
      },
    } as JwtPayloadDto,
    process.env.JWT_SECRET,
    { algorithm: 'HS512' }
  )
}
