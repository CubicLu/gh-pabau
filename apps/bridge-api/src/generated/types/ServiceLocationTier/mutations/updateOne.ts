import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierUpdateOneMutation = mutationField(
  'updateOneServiceLocationTier',
  {
    type: nonNull('ServiceLocationTier'),
    args: {
      data: nonNull('ServiceLocationTierUpdateInput'),
      where: nonNull('ServiceLocationTierWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceLocationTier.update({
        where,
        data,
        ...select,
      })
    },
  },
)
