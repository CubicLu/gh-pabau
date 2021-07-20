import { mutationField, nonNull } from 'nexus'

export const AccountBalanceUpdateOneMutation = mutationField(
  'updateOneAccountBalance',
  {
    type: nonNull('AccountBalance'),
    args: {
      where: nonNull('AccountBalanceWhereUniqueInput'),
      data: nonNull('AccountBalanceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.accountBalance.update({
        where,
        data,
        ...select,
      })
    },
  },
)
