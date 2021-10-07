import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionUpdateOneMutation = mutationField(
  'updateOneAppSubscription',
  {
    type: nonNull('AppSubscription'),
    args: {
      where: nonNull('AppSubscriptionWhereUniqueInput'),
      data: nonNull('AppSubscriptionUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.appSubscription.update({
        where,
        data,
        ...select,
      })
    },
  },
)
