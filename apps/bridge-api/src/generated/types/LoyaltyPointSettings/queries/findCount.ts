import { queryField, nonNull, list } from 'nexus'

export const LoyaltyPointSettingsFindCountQuery = queryField(
  'findManyLoyaltyPointSettingsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'LoyaltyPointSettingsWhereInput',
      orderBy: list('LoyaltyPointSettingsOrderByWithRelationInput'),
      cursor: 'LoyaltyPointSettingsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('LoyaltyPointSettingsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loyaltyPointSettings.count(args as any)
    },
  },
)
