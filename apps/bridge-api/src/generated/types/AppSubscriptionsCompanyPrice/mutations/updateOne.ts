import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceUpdateOneMutation = mutationField(
  'updateOneAppSubscriptionsCompanyPrice',
  {
    type: nonNull('AppSubscriptionsCompanyPrice'),
    args: {
      data: nonNull('AppSubscriptionsCompanyPriceUpdateInput'),
      where: nonNull('AppSubscriptionsCompanyPriceWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.update({
        where,
        data,
        ...select,
      })
    },
  },
)
