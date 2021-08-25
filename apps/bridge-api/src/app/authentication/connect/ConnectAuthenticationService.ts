import { Context } from '../../../context'
import { ConnectCredentials } from './interfaces/ConnectCredentials'
import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import { JwtAuthenticationToken } from '@pabau/yup'

export default class AuthenticationService {
  public constructor(private ctx: Context) {}

  public async findUser(loginInput: ConnectCredentials) {
    const user = await this.ctx.prisma.userMaster.findUnique({
      where: {
        email: loginInput.username,
      },
    })

    //user found, & verify password
    if (user && this.verifyPassword(loginInput.password, user.pass)) {
      return user
    }

    return null
  }

  public async findUserById(userId) {
    return await this.ctx.prisma.userMaster.findUnique({
      where: {
        contact_id: userId,
      },
    })
  }

  public verifyPassword(inputPassword: string, userPassword: string) {
    return (
      createHash('md5').update(inputPassword).digest('hex') === userPassword
    )
  }

  public generateJWT(contactId: number, companyId: number): string {
    const payload: JwtAuthenticationToken = {
      user: contactId,
      company: companyId,
      admin: null,
      owner: null,
      remote_url: null,
      remote_connect: null,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['public', 'user', 'connect'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': contactId.toString(),
        'x-hasura-org-id': companyId.toString(),
      },
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS512' })
  }

  public decodeJWT(token) {
    return jwt.decode(token) as JwtAuthenticationToken
  }
}
