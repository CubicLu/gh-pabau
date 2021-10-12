import { mutationField, nonNull } from 'nexus'

export const ServiceLocationPriceDeleteOneMutation = mutationField(
  'deleteOneServiceLocationPrice',
  {
    type: 'ServiceLocationPrice',
    args: {
      where: nonNull('ServiceLocationPriceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceLocationPrice.delete({
        where,
        ...select,
      })
    },
  },
)
