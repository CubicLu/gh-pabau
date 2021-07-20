import { mutationField, nonNull } from 'nexus'

export const MarketingSourceCreateOneMutation = mutationField(
  'createOneMarketingSource',
  {
    type: nonNull('MarketingSource'),
    args: {
      data: nonNull('MarketingSourceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.marketingSource.create({
        data,
        ...select,
      })
    },
  },
)
