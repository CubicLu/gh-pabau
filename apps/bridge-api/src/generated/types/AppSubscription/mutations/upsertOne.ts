import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionUpsertOneMutation = mutationField(
  'upsertOneAppSubscription',
  {
    type: nonNull('AppSubscription'),
    args: {
      where: nonNull('AppSubscriptionWhereUniqueInput'),
      create: nonNull('AppSubscriptionCreateInput'),
      update: nonNull('AppSubscriptionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscription.upsert({
        ...args,
        ...select,
      })
    },
  },
)
