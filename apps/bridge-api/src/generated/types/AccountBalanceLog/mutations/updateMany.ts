import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogUpdateManyMutation = mutationField(
  'updateManyAccountBalanceLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AccountBalanceLogWhereInput',
      data: nonNull('AccountBalanceLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalanceLog.updateMany(args as any)
    },
  },
)
