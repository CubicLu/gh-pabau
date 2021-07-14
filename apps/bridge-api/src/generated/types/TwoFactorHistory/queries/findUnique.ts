import { queryField, nonNull } from 'nexus'

export const TwoFactorHistoryFindUniqueQuery = queryField(
  'findUniqueTwoFactorHistory',
  {
    type: 'TwoFactorHistory',
    args: {
      where: nonNull('TwoFactorHistoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.twoFactorHistory.findUnique({
        where,
        ...select,
      })
    },
  },
)
