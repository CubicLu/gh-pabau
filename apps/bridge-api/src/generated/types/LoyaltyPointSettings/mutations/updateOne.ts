import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingsUpdateOneMutation = mutationField(
  'updateOneLoyaltyPointSettings',
  {
    type: nonNull('LoyaltyPointSettings'),
    args: {
      data: nonNull('LoyaltyPointSettingsUpdateInput'),
      where: nonNull('LoyaltyPointSettingsWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.loyaltyPointSettings.update({
        where,
        data,
        ...select,
      })
    },
  },
)
