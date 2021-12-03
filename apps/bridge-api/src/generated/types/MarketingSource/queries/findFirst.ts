import { queryField, list } from 'nexus'

export const MarketingSourceFindFirstQuery = queryField(
  'findFirstMarketingSource',
  {
    type: 'MarketingSource',
    args: {
      where: 'MarketingSourceWhereInput',
      orderBy: list('MarketingSourceOrderByWithRelationInput'),
      cursor: 'MarketingSourceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MarketingSourceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingSource.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
