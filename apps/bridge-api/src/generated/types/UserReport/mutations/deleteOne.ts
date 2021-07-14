import { mutationField, nonNull } from 'nexus'

export const UserReportDeleteOneMutation = mutationField(
  'deleteOneUserReport',
  {
    type: 'UserReport',
    args: {
      where: nonNull('UserReportWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userReport.delete({
        where,
        ...select,
      })
    },
  },
)
