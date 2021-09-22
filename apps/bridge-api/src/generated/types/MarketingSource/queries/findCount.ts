import { queryField, nonNull, list } from 'nexus'

export const MarketingSourceFindCountQuery = queryField(
  'findManyMarketingSourceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByWithRelationInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      distinct: 'MarketingSourceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.marketingSource.count(args as any)
    },
  },
)
