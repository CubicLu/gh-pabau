import { queryField, list } from 'nexus'

export const LoyaltyPointSettingsFindFirstQuery = queryField(
  'findFirstLoyaltyPointSettings',
  {
    type: 'LoyaltyPointSettings',
    args: {
      where: 'LoyaltyPointSettingsWhereInput',
      orderBy: list('LoyaltyPointSettingsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointSettingsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSettings.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
