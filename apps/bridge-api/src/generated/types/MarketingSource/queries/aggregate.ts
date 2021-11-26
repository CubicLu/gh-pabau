import { queryField, list } from 'nexus'

export const MarketingSourceAggregateQuery = queryField(
  'aggregateMarketingSource',
  {
    type: 'AggregateMarketingSource',
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByWithRelationInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingSource.aggregate({ ...args, ...select }) as any
    },
  },
)
