import { queryField, list } from 'nexus'

export const AppSubscriptionsCompanyPriceFindFirstQuery = queryField(
  'findFirstAppSubscriptionsCompanyPrice',
  {
    type: 'AppSubscriptionsCompanyPrice',
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      distinct: 'AppSubscriptionsCompanyPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
