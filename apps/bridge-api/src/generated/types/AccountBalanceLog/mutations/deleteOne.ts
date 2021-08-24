import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogDeleteOneMutation = mutationField(
  'deleteOneAccountBalanceLog',
  {
    type: 'AccountBalanceLog',
    args: {
      where: nonNull('AccountBalanceLogWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.accountBalanceLog.delete({
        where,
        ...select,
      })
    },
  },
)
