import { LoginInputDto, JwtPayloadDto } from './dto'
import { User } from '../../generated/schema'
import jwt from 'jsonwebtoken'
import { Context } from '../../context'
import { createHash } from 'crypto'

export default class AuthenticationService {
  private user: User

  public constructor(private ctx: Context) {}

  //TODO Refactor once company select screen is defined
  public async handleLoginRequest(loginForm: LoginInputDto): Promise<string> {
    const { username, password } = loginForm
    const users = await this.ctx.prisma.user.findMany({
      where: {
        username: {
          equals: username,
        },
      },
      include: { company: true },
    })

    const foundUser = users.find(
      (currentUser) =>
        currentUser.password ===
        AuthenticationService.generatePassword(currentUser, password)
    )

    if (!foundUser)
      throw new Error('Not Authenticated - Username or password incorrect.')

    this.user = {
      ...foundUser,
      password: undefined,
    }

    return this.generateJWT()
  }

  private static generateHash(
    password: string,
    encryption: 'md5' | 'sha1'
  ): string {
    return createHash(encryption).update(password).digest('hex')
  }

  private generateJWT(): string {
    return jwt.sign(
      {
        user: this.user.id,
        company: this.user.company_id,
        admin: Boolean(this.user.admin) ?? false,
        owner: this.user.id === this.user.company.admin ?? false,
        remote_url: this.user.company.remote_url,
        remote_connect: this.user.company.remote_connect,
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['public', 'user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': this.user.id.toString(),
          'x-hasura-org-id': this.user.company_id.toString(),
          'x-hasura-pabau': 'test',
        },
      } as JwtPayloadDto,
      process.env.JWT_SECRET,
      { algorithm: 'HS512' }
    )
  }

  /**
   * Generates a valid Pabau password, based upon the the `user.password_algor` db value
   *
   * Enum: [1: md5, 2:sha1]
   *
   * @param user - The `User` database model
   * @param password - The password to be encrypted
   *
   * @returns string encrypted password as string
   */
  private static generatePassword(user: User, password: string): string {
    const { password_algor, salt } = user
    switch (password_algor) {
      case 1:
        return AuthenticationService.generateHash(password, 'md5')
      case 2:
        return AuthenticationService.generateHash(
          `${salt}${password}${salt}`,
          'sha1'
        )
      default:
        throw new Error('Password algorithm not supported')
    }
  }

  public getAuthenticatedUser(): Omit<
    User,
    'password' | 'password_algor' | 'hash' | 'salt'
  > {
    return this.user
  }
}
