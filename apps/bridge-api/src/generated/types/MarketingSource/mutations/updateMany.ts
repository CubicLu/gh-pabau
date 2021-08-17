import { mutationField, nonNull } from 'nexus'

export const MarketingSourceUpdateManyMutation = mutationField(
  'updateManyMarketingSource',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MarketingSourceWhereInput',
      data: nonNull('MarketingSourceUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.marketingSource.updateMany(args as any)
    },
  },
)
