import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionCreateOneMutation = mutationField(
  'createOneAppSubscription',
  {
    type: nonNull('AppSubscription'),
    args: {
      data: nonNull('AppSubscriptionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.appSubscription.create({
        data,
        ...select,
      })
    },
  },
)
