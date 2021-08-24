import { mutationField, nonNull } from 'nexus'

export const AccountBalanceDeleteOneMutation = mutationField(
  'deleteOneAccountBalance',
  {
    type: 'AccountBalance',
    args: {
      where: nonNull('AccountBalanceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.accountBalance.delete({
        where,
        ...select,
      })
    },
  },
)
