import { mutationField, nonNull } from 'nexus'

export const AccountBalanceUpsertOneMutation = mutationField(
  'upsertOneAccountBalance',
  {
    type: nonNull('AccountBalance'),
    args: {
      where: nonNull('AccountBalanceWhereUniqueInput'),
      create: nonNull('AccountBalanceCreateInput'),
      update: nonNull('AccountBalanceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalance.upsert({
        ...args,
        ...select,
      })
    },
  },
)
