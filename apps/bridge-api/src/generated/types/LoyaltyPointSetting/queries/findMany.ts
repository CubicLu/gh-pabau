import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointSettingFindManyQuery = queryField(
  'findManyLoyaltyPointSetting',
  {
    type: nonNull(list(nonNull('LoyaltyPointSetting'))),
    args: {
      where: 'LoyaltyPointSettingWhereInput',
      orderBy: list('LoyaltyPointSettingOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSetting.findMany({
        ...args,
        ...select,
      })
    },
  },
)
