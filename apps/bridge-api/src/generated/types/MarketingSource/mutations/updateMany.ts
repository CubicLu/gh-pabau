import { mutationField, nonNull } from 'nexus'

export const MarketingSourceUpdateManyMutation = mutationField(
  'updateManyMarketingSource',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MarketingSourceUpdateManyMutationInput'),
      where: 'MarketingSourceWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.marketingSource.updateMany(args as any)
    },
  },
)
