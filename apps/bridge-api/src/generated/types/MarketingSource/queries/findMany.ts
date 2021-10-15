import { queryField, nonNull, list } from 'nexus'

export const MarketingSourceFindManyQuery = queryField(
  'findManyMarketingSource',
  {
    type: nonNull(list(nonNull('MarketingSource'))),
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      distinct: 'MarketingSourceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingSource.findMany({
        ...args,
        ...select,
      })
    },
  },
)
