import { mutationField, nonNull } from 'nexus'

export const ServiceRetailProductDeleteOneMutation = mutationField(
  'deleteOneServiceRetailProduct',
  {
    type: 'ServiceRetailProduct',
    args: {
      where: nonNull('ServiceRetailProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceRetailProduct.delete({
        where,
        ...select,
      })
    },
  },
)
