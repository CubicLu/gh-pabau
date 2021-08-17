import { mutationField, nonNull } from 'nexus'

export const UserActivityLogUpsertOneMutation = mutationField(
  'upsertOneUserActivityLog',
  {
    type: nonNull('UserActivityLog'),
    args: {
      where: nonNull('UserActivityLogWhereUniqueInput'),
      create: nonNull('UserActivityLogCreateInput'),
      update: nonNull('UserActivityLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userActivityLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
