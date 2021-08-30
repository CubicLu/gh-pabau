import { mutationField, nonNull } from 'nexus'

export const UserActivityLogUpdateOneMutation = mutationField(
  'updateOneUserActivityLog',
  {
    type: nonNull('UserActivityLog'),
    args: {
      where: nonNull('UserActivityLogWhereUniqueInput'),
      data: nonNull('UserActivityLogUpdateInput'),
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
