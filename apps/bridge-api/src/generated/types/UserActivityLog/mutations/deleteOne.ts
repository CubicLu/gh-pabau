import { mutationField, nonNull } from 'nexus'

export const UserActivityLogDeleteOneMutation = mutationField(
  'deleteOneUserActivityLog',
  {
    type: 'UserActivityLog',
    args: {
      where: nonNull('UserActivityLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userActivityLog.delete({
        where,
        ...select,
      })
    },
  },
)
