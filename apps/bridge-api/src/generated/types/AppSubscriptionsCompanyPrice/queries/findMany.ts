import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionsCompanyPriceFindManyQuery = queryField(
  'findManyAppSubscriptionsCompanyPrice',
  {
    type: nonNull(list(nonNull('AppSubscriptionsCompanyPrice'))),
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByWithRelationInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppSubscriptionsCompanyPriceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.findMany({
        ...args,
        ...select,
      })
    },
  },
)
