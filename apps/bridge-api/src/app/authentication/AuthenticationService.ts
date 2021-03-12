import { LoginInputDto, JwtPayloadDto, LogoutInputDto } from "./dto";
import { User } from '../../generated/schema'
import jwt from 'jsonwebtoken'
import { Context } from "../../context";
import { createHash, BinaryToTextEncoding } from "crypto";

export class AuthenticationService {

  private user:User;

  public constructor(private ctx: Context) {}
  //TODO Refactor once company select screen is defined
  public async handleLoginRequest(loginInput:LoginInputDto): Promise<string> {
    const users: User[] =  await this.ctx.prisma.user.findMany({
      where: {
        username: {
          equals: loginInput.username
        },
      },
    })
    this.user = users.find(currentUser => currentUser.password === this.generatePassword(currentUser, loginInput))
    if(!this.user || Object.getOwnPropertyNames(this.user).length === 0){
      throw new Error('Unauthorized access')
    }
    return this.generateJWT()
  }
  public async handleLogoutRequest(logoutInputDto: LogoutInputDto):Promise<boolean> {
    return !!(await this.ctx.prisma.user.findFirst({
      where:{
        id: logoutInputDto.userId
      }
    }))
  }
  private generateHash(password:string, encryption:string, encoding:BinaryToTextEncoding): string{
      return createHash(encryption).update(password).digest(encoding);
  }
  private async generateJWT(): Promise<string>{
    return jwt.sign(<JwtPayloadDto> {
      'user': this.user.id,
      'company': this.user.company_id,
      'username': this.user.username,
      'https://hasura.io/jwt/claims': {
        "x-hasura-allowed-roles": [
          'public','admin'
        ],
        'x-hasura-default-role': 'public',
        'x-hasura-user-id': this.user.id,
        'x-hasura-org-id': this.user.company_id,
        'x-hasura-james': 123
      }
    }, process.env.JWT_SECRET)
  }
  /**
   * Generates a valid Pabau password, based upon the the user.password_algor db value
   * Enum: [1: md5, 2:sha1]
   * @param user
   * @param loginInput
   *
   * @return encoded password as string
   * @private
   */
  private generatePassword(user: User, loginInput:LoginInputDto): string {
    switch (user.password_algor) {
      case 1:
        return this.generateHash(loginInput.password, 'md5', 'hex')
      case 2:
        return this.generateHash(user.salt + loginInput.password + user.salt, 'sha1', 'hex');
      default:
        throw new Error('Password algorithm not supported')
    }
  }
  public getAuthenticatedUser() : Omit<User, "password" | "password_algor" | "hash" | "salt"> {
    return this.user
  }
}
