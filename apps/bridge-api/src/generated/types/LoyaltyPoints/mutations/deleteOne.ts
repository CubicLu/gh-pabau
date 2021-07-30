import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointsDeleteOneMutation = mutationField(
  'deleteOneLoyaltyPoints',
  {
    type: 'LoyaltyPoints',
    args: {
      where: nonNull('LoyaltyPointsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.loyaltyPoints.delete({
        where,
        ...select,
      })
    },
  },
)
