import { mutationField, nonNull } from 'nexus'

export const ServiceUserTierUpsertOneMutation = mutationField(
  'upsertOneServiceUserTier',
  {
    type: nonNull('ServiceUserTier'),
    args: {
      where: nonNull('ServiceUserTierWhereUniqueInput'),
      create: nonNull('ServiceUserTierCreateInput'),
      update: nonNull('ServiceUserTierUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserTier.upsert({
        ...args,
        ...select,
      })
    },
  },
)
