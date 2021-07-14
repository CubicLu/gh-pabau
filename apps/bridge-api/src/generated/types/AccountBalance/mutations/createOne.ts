import { mutationField, nonNull } from 'nexus'

export const AccountBalanceCreateOneMutation = mutationField(
  'createOneAccountBalance',
  {
    type: nonNull('AccountBalance'),
    args: {
      data: nonNull('AccountBalanceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.accountBalance.create({
        data,
        ...select,
      })
    },
  },
)
