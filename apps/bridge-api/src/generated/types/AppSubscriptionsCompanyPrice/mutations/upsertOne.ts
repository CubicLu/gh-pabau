import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceUpsertOneMutation = mutationField(
  'upsertOneAppSubscriptionsCompanyPrice',
  {
    type: nonNull('AppSubscriptionsCompanyPrice'),
    args: {
      where: nonNull('AppSubscriptionsCompanyPriceWhereUniqueInput'),
      create: nonNull('AppSubscriptionsCompanyPriceCreateInput'),
      update: nonNull('AppSubscriptionsCompanyPriceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.upsert({
        ...args,
        ...select,
      })
    },
  },
)
