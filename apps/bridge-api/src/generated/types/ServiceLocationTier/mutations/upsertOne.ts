import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierUpsertOneMutation = mutationField(
  'upsertOneServiceLocationTier',
  {
    type: nonNull('ServiceLocationTier'),
    args: {
      where: nonNull('ServiceLocationTierWhereUniqueInput'),
      create: nonNull('ServiceLocationTierCreateInput'),
      update: nonNull('ServiceLocationTierUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceLocationTier.upsert({
        ...args,
        ...select,
      })
    },
  },
)
