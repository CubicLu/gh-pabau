import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionsCompanyPriceFindCountQuery = queryField(
  'findManyAppSubscriptionsCompanyPriceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      distinct: 'AppSubscriptionsCompanyPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscriptionsCompanyPrice.count(args as any)
    },
  },
)
