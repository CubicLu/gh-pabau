import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryUpdateManyMutation = mutationField(
  'updateManyTwoFactorHistory',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('TwoFactorHistoryUpdateManyMutationInput'),
      where: 'TwoFactorHistoryWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.twoFactorHistory.updateMany(args as any)
    },
  },
)
