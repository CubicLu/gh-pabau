import { queryField, list } from 'nexus'

export const LoyaltyPointSettingsAggregateQuery = queryField(
  'aggregateLoyaltyPointSettings',
  {
    type: 'AggregateLoyaltyPointSettings',
    args: {
      where: 'LoyaltyPointSettingsWhereInput',
      orderBy: list('LoyaltyPointSettingsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSettings.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
