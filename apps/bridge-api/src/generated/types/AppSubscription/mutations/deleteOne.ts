import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionDeleteOneMutation = mutationField(
  'deleteOneAppSubscription',
  {
    type: 'AppSubscription',
    args: {
      where: nonNull('AppSubscriptionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.appSubscription.delete({
        where,
        ...select,
      })
    },
  },
)
