import { queryField, list } from 'nexus'

export const LoyaltyPointSettingAggregateQuery = queryField(
  'aggregateLoyaltyPointSetting',
  {
    type: 'AggregateLoyaltyPointSetting',
    args: {
      where: 'LoyaltyPointSettingWhereInput',
      orderBy: list('LoyaltyPointSettingOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSetting.aggregate({ ...args, ...select }) as any
    },
  },
)
