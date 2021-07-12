import { mutationField, nonNull } from 'nexus'

export const AccountBalanceUpdateManyMutation = mutationField(
  'updateManyAccountBalance',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AccountBalanceWhereInput',
      data: nonNull('AccountBalanceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalance.updateMany(args as any)
    },
  },
)
