import { mutationField, nonNull } from 'nexus'

export const MarketingSourceUpsertOneMutation = mutationField(
  'upsertOneMarketingSource',
  {
    type: nonNull('MarketingSource'),
    args: {
      where: nonNull('MarketingSourceWhereUniqueInput'),
      create: nonNull('MarketingSourceCreateInput'),
      update: nonNull('MarketingSourceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingSource.upsert({
        ...args,
        ...select,
      })
    },
  },
)
