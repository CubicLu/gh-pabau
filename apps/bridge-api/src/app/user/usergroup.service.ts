import { Context } from '../../context'

export default class UserGroupService {
  public constructor(private ctx: Context) {}

  public retrieveUserGroupMembers = async (
    userId: number
  ): Promise<number[]> => {
    const group = await this.ctx.prisma.userGroup.findMany({
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
