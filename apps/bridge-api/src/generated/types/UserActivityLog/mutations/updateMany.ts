import { mutationField, nonNull } from 'nexus'

export const UserActivityLogUpdateManyMutation = mutationField(
  'updateManyUserActivityLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserActivityLogWhereInput',
      data: nonNull('UserActivityLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userActivityLog.updateMany(args as any)
    },
  },
)
