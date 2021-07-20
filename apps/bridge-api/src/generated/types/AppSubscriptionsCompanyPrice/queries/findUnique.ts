import { queryField, nonNull } from 'nexus'

export const AppSubscriptionsCompanyPriceFindUniqueQuery = queryField(
  'findUniqueAppSubscriptionsCompanyPrice',
  {
    type: 'AppSubscriptionsCompanyPrice',
    args: {
      where: nonNull('AppSubscriptionsCompanyPriceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.findUnique({
        where,
        ...select,
      })
    },
  },
)
