import { mutationField, nonNull } from 'nexus'

export const CreditBalanceUpdateManyMutation = mutationField(
  'updateManyCreditBalance',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CreditBalanceUpdateManyMutationInput'),
      where: 'CreditBalanceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.creditBalance.updateMany(args as any)
    },
  },
)
