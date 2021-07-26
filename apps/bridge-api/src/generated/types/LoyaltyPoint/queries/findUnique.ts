import { queryField, nonNull } from 'nexus'

export const LoyaltyPointFindUniqueQuery = queryField(
  'findUniqueLoyaltyPoint',
  {
    type: 'LoyaltyPoint',
    args: {
      where: nonNull('LoyaltyPointWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.loyaltyPoint.findUnique({
        where,
        ...select,
      })
    },
  },
)
