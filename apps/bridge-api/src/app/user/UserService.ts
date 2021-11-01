import { Context } from '../../context'

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

  public static retrieveUserGroupMembers = async (
    ctx: Context,
    userId: number
  ): Promise<number[]> => {
    const group = await ctx.prisma.userGroup.findMany({
      where: {
        UserGroupMember: {
          some: {
            user_id: { equals: userId },
          },
        },
      },
      select: {
        UserGroupMember: {
          select: {
            user_id: true,
            group_id: true,
          },
        },
      },
    })
    if (group.length === 0) return [userId]
    const ids = []
    for (const item of group) {
      for (const member of item?.UserGroupMember) {
        ids.push(member.user_id)
      }
    }
    return ids
  }
}
