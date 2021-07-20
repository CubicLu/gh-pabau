import { queryField, list } from 'nexus'

export const MarketingSourceAggregateQuery = queryField(
  'aggregateMarketingSource',
  {
    type: 'AggregateMarketingSource',
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      distinct: 'MarketingSourceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingSource.aggregate({ ...args, ...select }) as any
    },
  },
)
