import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceUpdateManyMutation = mutationField(
  'updateManyAppSubscriptionsCompanyPrice',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AppSubscriptionsCompanyPriceUpdateManyMutationInput'),
      where: 'AppSubscriptionsCompanyPriceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscriptionsCompanyPrice.updateMany(args as any)
    },
  },
)
