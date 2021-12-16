import { queryField, list } from 'nexus'

export const LoyaltyPointSettingFindFirstQuery = queryField(
  'findFirstLoyaltyPointSetting',
  {
    type: 'LoyaltyPointSetting',
    args: {
      where: 'LoyaltyPointSettingWhereInput',
      orderBy: list('LoyaltyPointSettingOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointSettingScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSetting.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
