import { queryField, nonNull } from 'nexus'

export const LoyaltyPointsFindUniqueQuery = queryField(
  'findUniqueLoyaltyPoints',
  {
    type: 'LoyaltyPoints',
    args: {
      where: nonNull('LoyaltyPointsWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.loyaltyPoints.findUnique({
        where,
        ...select,
      })
    },
  },
)
