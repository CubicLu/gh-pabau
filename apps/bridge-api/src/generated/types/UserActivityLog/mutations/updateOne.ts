import { mutationField, nonNull } from 'nexus'

export const UserActivityLogUpdateOneMutation = mutationField(
  'updateOneUserActivityLog',
  {
    type: nonNull('UserActivityLog'),
    args: {
      data: nonNull('UserActivityLogUpdateInput'),
      where: nonNull('UserActivityLogWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userActivityLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)
