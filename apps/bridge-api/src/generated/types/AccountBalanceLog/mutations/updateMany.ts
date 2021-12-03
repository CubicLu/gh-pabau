import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogUpdateManyMutation = mutationField(
  'updateManyAccountBalanceLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AccountBalanceLogUpdateManyMutationInput'),
      where: 'AccountBalanceLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountBalanceLog.updateMany(args as any)
    },
  },
)
