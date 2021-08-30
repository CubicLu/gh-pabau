import { mutationField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceUpdateOneMutation = mutationField(
  'updateOneAppSubscriptionsCompanyPrice',
  {
    type: nonNull('AppSubscriptionsCompanyPrice'),
    args: {
      where: nonNull('AppSubscriptionsCompanyPriceWhereUniqueInput'),
      data: nonNull('AppSubscriptionsCompanyPriceUpdateInput'),
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
