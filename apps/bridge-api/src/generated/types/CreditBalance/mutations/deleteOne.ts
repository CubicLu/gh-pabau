import { mutationField, nonNull } from 'nexus'

export const CreditBalanceDeleteOneMutation = mutationField(
  'deleteOneCreditBalance',
  {
    type: 'CreditBalance',
    args: {
      where: nonNull('CreditBalanceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.creditBalance.delete({
        where,
        ...select,
      })
    },
  },
)
