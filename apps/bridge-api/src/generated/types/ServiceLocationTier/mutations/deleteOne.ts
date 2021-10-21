import { mutationField, nonNull } from 'nexus'

export const ServiceLocationTierDeleteOneMutation = mutationField(
  'deleteOneServiceLocationTier',
  {
    type: 'ServiceLocationTier',
    args: {
      where: nonNull('ServiceLocationTierWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceLocationTier.delete({
        where,
        ...select,
      })
    },
  },
)
