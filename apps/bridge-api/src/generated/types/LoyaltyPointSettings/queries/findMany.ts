import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointSettingsFindManyQuery = queryField(
  'findManyLoyaltyPointSettings',
  {
    type: nonNull(list(nonNull('LoyaltyPointSettings'))),
    args: {
      where: 'LoyaltyPointSettingsWhereInput',
      orderBy: list('LoyaltyPointSettingsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointSettingsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loyaltyPointSettings.findMany({
        ...args,
        ...select,
      })
    },
  },
)
