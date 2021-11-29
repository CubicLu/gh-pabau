import { queryField, nonNull, list } from 'nexus'

export const AppSubscriptionsCompanyPriceFindCountQuery = queryField(
  'findManyAppSubscriptionsCompanyPriceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByWithRelationInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppSubscriptionsCompanyPriceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appSubscriptionsCompanyPrice.count(args as any)
    },
  },
)
