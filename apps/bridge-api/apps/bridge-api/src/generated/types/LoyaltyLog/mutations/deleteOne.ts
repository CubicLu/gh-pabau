import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogDeleteOneMutation = mutationField(
  'deleteOneLoyaltyLog',
  {
    type: 'LoyaltyLog',
    args: {
      where: nonNull('LoyaltyLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.loyaltyLog.delete({
        where,
        ...select,
      })
    },
  },
)
