import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryDeleteOneMutation = mutationField(
  'deleteOneTwoFactorHistory',
  {
    type: 'TwoFactorHistory',
    args: {
      where: nonNull('TwoFactorHistoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.twoFactorHistory.delete({
        where,
        ...select,
      })
    },
  },
)
