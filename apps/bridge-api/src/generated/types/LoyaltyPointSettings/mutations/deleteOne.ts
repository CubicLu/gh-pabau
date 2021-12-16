import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingsDeleteOneMutation = mutationField(
  'deleteOneLoyaltyPointSettings',
  {
    type: 'LoyaltyPointSettings',
    args: {
      where: nonNull('LoyaltyPointSettingsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.loyaltyPointSettings.delete({
        where,
        ...select,
      })
    },
  },
)
