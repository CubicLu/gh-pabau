import { booleanArg, extendType, intArg, nonNull } from 'nexus'
import { Context } from '../../context'

interface UserMainPermissionInput {
  group_id: number
  delete_alert_notes: boolean
}

export const PabauUserMainPermission = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertManyUsersMainPermissionByGroupId', {
      type: 'Int',
      description:
        'Creates/Updates a many users main permission belonging to the provided group_id',
      args: {
        group_id: nonNull(intArg()),
        delete_alert_notes: nonNull(booleanArg()),
      },
      async resolve(_, input: UserMainPermissionInput, ctx: Context) {
        try {
          const users = await ctx.prisma.user.findMany({
            where: {
              UserGroupMember: {
                group_id: {
                  equals: input.group_id,
                },
              },
            },
            include: {
              UserMainPermission: true,
            },
          })
          return users.map(async (user) => {
            return await (user.UserMainPermission.length > 0
              ? ctx.prisma.userMainPermission.update({
                  where: {
                    id: user.UserMainPermission[0].id,
                  },
                  data: {
                    user_id: user.id,
                    delete_alert_notes: input.delete_alert_notes,
                  },
                })
              : ctx.prisma.userMainPermission.create({
                  data: {
                    user_id: user.id,
                    delete_alert_notes: input.delete_alert_notes,
                  },
                }))
          }).length
        } catch (error) {
          return error
        }
      },
    })
  },
})
