import { queryField, nonNull } from 'nexus'

export const LoyaltyPointSettingFindUniqueQuery = queryField(
  'findUniqueLoyaltyPointSetting',
  {
    type: 'LoyaltyPointSetting',
    args: {
      where: nonNull('LoyaltyPointSettingWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.loyaltyPointSetting.findUnique({
        where,
        ...select,
      })
    },
  },
)
