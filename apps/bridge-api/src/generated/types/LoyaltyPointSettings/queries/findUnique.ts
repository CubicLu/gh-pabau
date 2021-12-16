import { queryField, nonNull } from 'nexus'

export const LoyaltyPointSettingsFindUniqueQuery = queryField(
  'findUniqueLoyaltyPointSettings',
  {
    type: 'LoyaltyPointSettings',
    args: {
      where: nonNull('LoyaltyPointSettingsWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.loyaltyPointSettings.findUnique({
        where,
        ...select,
      })
    },
  },
)
