import { mutationField, nonNull } from 'nexus'

export const MarketingSourceDeleteOneMutation = mutationField(
  'deleteOneMarketingSource',
  {
    type: 'MarketingSource',
    args: {
      where: nonNull('MarketingSourceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.marketingSource.delete({
        where,
        ...select,
      })
    },
  },
)
