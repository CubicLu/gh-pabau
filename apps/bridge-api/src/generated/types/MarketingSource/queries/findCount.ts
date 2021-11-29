import { queryField, nonNull, list } from 'nexus'

export const MarketingSourceFindCountQuery = queryField(
  'findManyMarketingSourceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByWithRelationInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MarketingSourceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.marketingSource.count(args as any)
    },
  },
)
