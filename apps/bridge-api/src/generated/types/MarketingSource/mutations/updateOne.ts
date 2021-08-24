import { mutationField, nonNull } from 'nexus'

export const MarketingSourceUpdateOneMutation = mutationField(
  'updateOneMarketingSource',
  {
    type: nonNull('MarketingSource'),
    args: {
      where: nonNull('MarketingSourceWhereUniqueInput'),
      data: nonNull('MarketingSourceUpdateInput'),
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
