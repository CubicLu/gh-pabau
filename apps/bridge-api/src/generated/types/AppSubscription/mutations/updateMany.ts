import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionUpdateManyMutation = mutationField(
  'updateManyAppSubscription',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AppSubscriptionWhereInput',
      data: nonNull('AppSubscriptionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscription.updateMany(args as any)
    },
  },
)
