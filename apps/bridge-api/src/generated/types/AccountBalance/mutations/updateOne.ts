import { mutationField, nonNull } from 'nexus'

export const AccountBalanceUpdateOneMutation = mutationField(
  'updateOneAccountBalance',
  {
    type: nonNull('AccountBalance'),
    args: {
      data: nonNull('AccountBalanceUpdateInput'),
      where: nonNull('AccountBalanceWhereUniqueInput'),
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
