import { mutationField, nonNull } from 'nexus'

export const AccountBalanceUpdateManyMutation = mutationField(
  'updateManyAccountBalance',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AccountBalanceUpdateManyMutationInput'),
      where: 'AccountBalanceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalance.updateMany(args as any)
    },
  },
)
