import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointSettingFindCountQuery = queryField(
  'findManyLoyaltyPointSettingCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LoyaltyPointSettingWhereInput',
      orderBy: list('LoyaltyPointSettingOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPointSetting.count(args as any)
    },
  },
)
