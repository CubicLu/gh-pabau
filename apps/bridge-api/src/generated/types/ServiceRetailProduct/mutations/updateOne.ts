import { mutationField, nonNull } from 'nexus'

export const ServiceRetailProductUpdateOneMutation = mutationField(
  'updateOneServiceRetailProduct',
  {
    type: nonNull('ServiceRetailProduct'),
    args: {
      data: nonNull('ServiceRetailProductUpdateInput'),
      where: nonNull('ServiceRetailProductWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceRetailProduct.update({
        where,
        data,
        ...select,
      })
    },
  },
)
