import { queryField, nonNull, list } from 'nexus'

export const MarketingSourceFindManyQuery = queryField(
  'findManyMarketingSource',
  {
    type: nonNull(list(nonNull('MarketingSource'))),
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByWithRelationInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MarketingSourceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingSource.findMany({
        ...args,
        ...select,
      })
    },
  },
)
