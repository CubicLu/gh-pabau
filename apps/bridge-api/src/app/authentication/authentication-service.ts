import { Company, User, CompanyDetails } from '@prisma/client'
import {
  createHash,
  BinaryToTextEncoding,
  createDecipheriv,
  createCipheriv,
} from 'crypto'
import jwt from 'jsonwebtoken'
import { Context } from '../../context'
import {
  JwtPayloadDto,
  LoginInputDto,
  ChangePasswordInputDto,
  ResetPasswordInputDto,
} from './dto'
import { validatePassword } from './yup'

type AuthenticatedUser = Pick<
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
export default class AuthenticationService {
  get authenticatedUser(): Omit<
    AuthenticatedUser,
    'password' | 'password_algor' | 'salt' | 'hash'
  > {
    return this?.user
  }
  private user: AuthenticatedUser
  private encoding: BinaryToTextEncoding = 'hex'

  public constructor(private ctx: Context) {}

  private async queryUser(
    prisma: Context['prisma'],
    username: string,
    password: string
  ) {
    const users = await prisma.user.findMany({
      where: {
        username: {
          equals: username,
        },
      },
      select: {
        id: true,
        username: true,
        password: true,
        password_algor: true,
        salt: true,
        hash: true,
        admin: true,
        locale: true,
        Company: {
          select: {
            id: true,
            admin: true,
            remote_url: true,
            remote_connect: true,
            details: {
              select: {
                language: true,
              },
            },
          },
        },
      },
    })
    const user = users.find(
      (user) => user?.password === this.generatePassword(user, password)
    )
    if (!user) {
      throw new Error('Incorrect email or password')
    }
    return user
  }

  //TODO Refactor once company select screen is defined
  public async handleLoginRequest({
    username,
    password,
  }: LoginInputDto): Promise<string> {
    const user = await this.queryUser(
      this.ctx.prismaArray(this.ctx.authenticated?.remote_url),
      username,
      password
    )

    // Check if user appears to have no remote_url on pod db
    if (this.ctx.authenticated?.remote_url && !user.Company.remote_url) {
      throw new Error('Legacy/pod mismatch 1')
    }

    // Check if user appears to have a legacy JWT but company is now on a pod
    if (
      this.ctx.authenticated &&
      !this.ctx.authenticated.remote_url &&
      user.Company.remote_url
    ) {
      throw new Error('Legacy/pod mismatch 2')
    }

    // If user belongs to a pod, but we are legacy, then re-authenticate against the correct pod
    if (
      Boolean(this.ctx.authenticated?.remote_url) !==
      Boolean(user.Company.remote_url)
    ) {
      const user2 = await this.queryUser(
        this.ctx.prismaArray(user.Company.remote_url),
        username,
        password
      )
      this.user = user2
      console.log(`[auth] pod login: legacy=${user.id} pod=${this.user.id}`)
    } else {
      this.user = user
      console.log(`[auth] legacy login: legacy=${user.id}`)
    }

    return this.generateJWT()
  }
  //TODO refactor this method with a login class, the service class should not update the password
  public async handlePasswordChange(
    input: ChangePasswordInputDto
  ): Promise<User> {
    const user = await this.ctx.prisma.user.findFirst({
      where: {
        id: {
          equals: this.ctx.authenticated.user,
        },
      },
    })
    if (
      await validatePassword.validate({
        password: input.newPassword,
        username: this.user.username,
      })
    ) {
      if (
        this.user.password ===
        this.generatePassword(this.user, input.currentPassword)
      ) {
        const passwordHash = this.generatePassword(this.user, input.newPassword)
        const update = await this.ctx.prisma.user.updateMany({
          where: {
            username: this.user.username,
          },
          data: {
            password: passwordHash,
          },
        })
        if (!update) {
          throw new Error('Something went wrong while updating your password')
        }
        return user
      } else {
        throw new Error('Old password not matched')
      }
    }
  }

  private generateHash(password: string, encryption: 'md5' | 'sha1'): string {
    return createHash(encryption).update(password).digest(this.encoding)
  }
  public generateJWT(): string {
    return jwt.sign(
      {
        remote_url: this.user.Company.remote_url,
        remote_connect: this.user.Company.remote_connect,
        user: this.user.id,
        company: this.user.Company.id,
        admin: Boolean(this.user.admin) ?? false,
        owner: this.user.id === this.user.Company.admin ?? false,
        language: {
          user: this.user.locale,
          company: this.user.Company?.details?.language,
        },
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['public', 'user'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': this.user.id.toString(),
          'x-hasura-org-id': this.user.Company.id.toString(),
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
   * @param password - The user-supplied password
   *
   * @returns encoded password as string
   */
  private generatePassword(user: AuthenticatedUser, password: string): string {
    switch (user.password_algor) {
      case 1:
        return this.generateHash(password, 'md5')
      case 2:
        return this.generateHash(`${user.salt}${password}${user.salt}`, 'sha1')
      default:
        throw new Error('Password algorithm not supported')
    }
  }
  // TODO this should be refactored asap
  public async encryptDecryptText(
    action: 'encryption' | 'decryption',
    text: string
  ) {
    const code = process.env.JWT_SECRET
    const key = code.repeat(32).substr(0, 32)
    const iv = code.repeat(16).substr(0, 16)
    if (text === '') {
      throw new Error('text is empty')
    }
    switch (action) {
      case 'encryption': {
        const encrypto = {
          encrypt(text: string) {
            const cipher = createCipheriv('aes-256-ctr', key, iv)
            let encrypted = cipher.update(text, 'utf8', 'hex')
            encrypted += cipher.final('hex')
            return encrypted
          },
        }
        return encrypto.encrypt(text)
      }
      case 'decryption': {
        const email = text
        const decipher = createDecipheriv('aes-256-ctr', key, iv)
        let decrypteEmail = decipher.update(email, 'hex', 'utf8')
        return (decrypteEmail += decipher.final('utf8'))
      }
    }
  }
  public async forgotPasswordGenerator(
    input: ResetPasswordInputDto
  ): Promise<boolean> {
    const users = await this.ctx.prisma.user.findFirst({
      where: {
        username: {
          equals: input.token,
        },
      },
    })
    if (users === null) {
      throw new Error('invalid user')
    }
    if (
      await validatePassword.validate({
        password: input.newPassword,
        username: users.username,
      })
    ) {
      const HashPassword = this.generatePassword(users, input.newPassword)
      const update = await this.ctx.prisma.user.updateMany({
        where: {
          username: users.username,
        },
        data: {
          password: HashPassword,
        },
      })
      if (!update) {
        throw new Error('Something went wrong while updating your password')
      }
      return true
    } else {
      throw new Error('Old password not matched')
    }
  }
}
