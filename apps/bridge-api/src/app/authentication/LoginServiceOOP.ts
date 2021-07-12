import { Context } from '../../context'
import { JwtUser, LoginInputDto } from './dto'
import AuthenticationService from './AuthenticationService'
import { User } from '../../generated/schema'

export default class LoginService {
  public ctx
  public user
  public authService

  constructor(ctx: Context) {
    this.ctx = ctx
    this.authService = new AuthenticationService(ctx)
  }

  async findUsers(loginParams: LoginInputDto) {
    try {
      return await this.ctx.prisma.user.findMany({
        where: {
          username: {
            equals: loginParams.username,
          },
        },
        include: {
          company: true,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  verify(users: User[], loginParams: LoginInputDto) {
    return users.find(
      (currentUser) =>
        currentUser.password ===
        AuthenticationService.generatePassword(currentUser, loginParams)
    )
  }
  verifyWithCompanyId(
    users: User[],
    company_id: number,
    loginParams: LoginInputDto
  ) {
    return users.find(
      (currentUser) =>
        currentUser.password ===
          AuthenticationService.generatePassword(currentUser, loginParams) &&
        currentUser.company_id === company_id
    )
  }

  authenticateUser(user: JwtUser) {
    this.authService.user = user
    return this.authService.generateJWT()
  }
}
