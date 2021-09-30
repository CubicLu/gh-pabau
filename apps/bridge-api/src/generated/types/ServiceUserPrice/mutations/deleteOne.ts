import { mutationField, nonNull } from 'nexus'

export const ServiceUserPriceDeleteOneMutation = mutationField(
  'deleteOneServiceUserPrice',
  {
    type: 'ServiceUserPrice',
    args: {
      where: nonNull('ServiceUserPriceWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceUserPrice.delete({
        where,
        ...select,
      })
    },
  },
)
