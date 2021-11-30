import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionUpdateOneMutation = mutationField(
  'updateOneAppSubscription',
  {
    type: nonNull('AppSubscription'),
    args: {
      data: nonNull('AppSubscriptionUpdateInput'),
      where: nonNull('AppSubscriptionWhereUniqueInput'),
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
