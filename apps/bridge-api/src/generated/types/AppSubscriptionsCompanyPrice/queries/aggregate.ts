import { queryField, list } from 'nexus'

export const AppSubscriptionsCompanyPriceAggregateQuery = queryField(
  'aggregateAppSubscriptionsCompanyPrice',
  {
    type: 'AggregateAppSubscriptionsCompanyPrice',
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByWithRelationInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
