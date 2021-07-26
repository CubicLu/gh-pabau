import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointDeleteOneMutation = mutationField(
  'deleteOneLoyaltyPoint',
  {
    type: 'LoyaltyPoint',
    args: {
      where: nonNull('LoyaltyPointWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.loyaltyPoint.delete({
        where,
        ...select,
      })
    },
  },
)
