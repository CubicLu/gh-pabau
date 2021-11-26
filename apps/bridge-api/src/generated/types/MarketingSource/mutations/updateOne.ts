import { mutationField, nonNull } from 'nexus'

export const MarketingSourceUpdateOneMutation = mutationField(
  'updateOneMarketingSource',
  {
    type: nonNull('MarketingSource'),
    args: {
      data: nonNull('MarketingSourceUpdateInput'),
      where: nonNull('MarketingSourceWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.marketingSource.update({
        where,
        data,
        ...select,
      })
    },
  },
)
