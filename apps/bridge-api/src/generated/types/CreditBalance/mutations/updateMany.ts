import { mutationField, nonNull } from 'nexus'

export const CreditBalanceUpdateManyMutation = mutationField(
  'updateManyCreditBalance',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CreditBalanceWhereInput',
      data: nonNull('CreditBalanceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditBalance.updateMany(args as any)
    },
  },
)
