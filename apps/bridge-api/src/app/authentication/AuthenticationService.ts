import { createDecipheriv, createHash, createCipheriv } from 'crypto'
import jwt from 'jsonwebtoken'
import { Context } from '../../context'
import { User } from '../../generated/schema'
import {
  JwtPayloadDto,
  LoginInputDto,
  ResetPasswordInputDto,
  ChangePasswordInputDto,
} from './dto'
import { validatePassword } from './yup'

export default class AuthenticationService {
  private user: User

  public constructor(private ctx: Context) {}

  //TODO Refactor once company select screen is defined
  public async handleLoginRequest(loginInput: LoginInputDto): Promise<string> {
    const users = await this.ctx.prisma.user.findMany({
      where: {
        username: {
          equals: loginInput.username,
        },
      },
      include: {
        company: true,
      },
    })
    this.user = users.find(
      (currentUser) =>
        currentUser.password ===
        AuthenticationService.generatePassword(currentUser, loginInput)
    )
    if (!this.user || Object.getOwnPropertyNames(this.user).length === 0) {
      throw new Error('Unauthorized access')
    }
    return this.generateJWT()
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
      const HashPassword = AuthenticationService.generatePassword(
        users,
        input.newPassword
      )
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

  public async handlePasswordChange(
    input: ChangePasswordInputDto
  ): Promise<User> {
    this.user = await this.ctx.prisma.user.findFirst({
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
        AuthenticationService.generatePassword(this.user, input.currentPassword)
      ) {
        const passwordHash = AuthenticationService.generatePassword(
          this.user,
          input.newPassword
        )
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
        return this.user
      } else {
        throw new Error('Old password not matched')
      }
    }
  }

  private static generateHash(
    password: string,
    encryption: 'md5' | 'sha1'
  ): string {
    return createHash(encryption).update(password).digest('hex')
  }
  public generateJWT(): string {
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
   * @param loginInput - The user-supplied login form
   *
   * @returns encoded password as string
   */
  public static generatePassword(
    user: User,
    loginInput: LoginInputDto
  ): string {
    switch (user.password_algor) {
      case 1:
        return AuthenticationService.generateHash(loginInput.password, 'md5')
      case 2:
        return AuthenticationService.generateHash(
          user.salt + loginInput.password + user.salt,
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
      case 'encryption':
        {
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
        break
      case 'decryption':
        {
          const email = text
          const decipher = createDecipheriv('aes-256-ctr', key, iv)
          let decrypteEmail = decipher.update(email, 'hex', 'utf8')
          return (decrypteEmail += decipher.final('utf8'))
        }
        break
    }
  }
}
