import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingDeleteOneMutation = mutationField(
  'deleteOneLoyaltyPointSetting',
  {
    type: 'LoyaltyPointSetting',
    args: {
      where: nonNull('LoyaltyPointSettingWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.loyaltyPointSetting.delete({
        where,
        ...select,
      })
    },
  },
)
