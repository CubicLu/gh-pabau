import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionUpdateManyMutation = mutationField(
  'updateManyAppSubscription',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AppSubscriptionUpdateManyMutationInput'),
      where: 'AppSubscriptionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscription.updateMany(args as any)
    },
  },
)
