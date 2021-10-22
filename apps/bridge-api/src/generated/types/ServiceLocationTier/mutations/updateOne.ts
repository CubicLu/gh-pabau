import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierUpdateOneMutation = mutationField(
  'updateOneServiceLocationTier',
  {
    type: nonNull('ServiceLocationTier'),
    args: {
      where: nonNull('ServiceLocationTierWhereUniqueInput'),
      data: nonNull('ServiceLocationTierUpdateInput'),
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
