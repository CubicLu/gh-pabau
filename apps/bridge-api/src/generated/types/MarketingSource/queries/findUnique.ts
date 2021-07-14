import { queryField, nonNull } from 'nexus'

export const MarketingSourceFindUniqueQuery = queryField(
  'findUniqueMarketingSource',
  {
    type: 'MarketingSource',
    args: {
      where: nonNull('MarketingSourceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.marketingSource.findUnique({
        where,
        ...select,
      })
    },
  },
)
