import { mutationField, nonNull } from 'nexus'

export const UserActivityLogUpdateManyMutation = mutationField(
  'updateManyUserActivityLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserActivityLogUpdateManyMutationInput'),
      where: 'UserActivityLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userActivityLog.updateMany(args as any)
    },
  },
)
