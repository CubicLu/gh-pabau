export default class UserService {
  public constructor(private prismaArray, private user) {}

  public async updateLastLogin() {
    return await this.prismaArray(this.user.Company.remote_url).user.update({
      where: {
        id: this.user.id,
      },
      data: {
        last_login: {
          set: new Date().toISOString(),
        },
      },
    })
  }
}
