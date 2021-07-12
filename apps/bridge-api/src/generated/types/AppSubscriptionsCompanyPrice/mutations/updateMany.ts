import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceUpdateManyMutation = mutationField(
  'updateManyAppSubscriptionsCompanyPrice',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      data: nonNull('AppSubscriptionsCompanyPriceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscriptionsCompanyPrice.updateMany(args as any)
    },
  },
)
