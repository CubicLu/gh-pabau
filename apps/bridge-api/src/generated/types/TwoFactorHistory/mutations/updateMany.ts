import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryUpdateManyMutation = mutationField(
  'updateManyTwoFactorHistory',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'TwoFactorHistoryWhereInput',
      data: nonNull('TwoFactorHistoryUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.twoFactorHistory.updateMany(args as any)
    },
  },
)
