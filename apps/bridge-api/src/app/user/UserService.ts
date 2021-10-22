export default class UserService {
  public constructor(private prismaArray, private user) {}

  public async updateLastLogin(legacy = true) {
    const remoteUrl =
      this.user.Company.remote_url && !legacy
        ? this.user.Company.remote_url
        : undefined
    return await this.prismaArray(remoteUrl).user.update({
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
