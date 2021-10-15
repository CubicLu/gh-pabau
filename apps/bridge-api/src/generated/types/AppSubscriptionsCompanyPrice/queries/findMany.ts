import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionsCompanyPriceFindManyQuery = queryField(
  'findManyAppSubscriptionsCompanyPrice',
  {
    type: nonNull(list(nonNull('AppSubscriptionsCompanyPrice'))),
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      distinct: 'AppSubscriptionsCompanyPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.findMany({
        ...args,
        ...select,
      })
    },
  },
)
