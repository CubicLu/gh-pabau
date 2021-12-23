import { mutationField, nonNull } from 'nexus'

export const ServiceRetailProductCreateOneMutation = mutationField(
  'createOneServiceRetailProduct',
  {
    type: nonNull('ServiceRetailProduct'),
    args: {
      data: nonNull('ServiceRetailProductCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceRetailProduct.create({
        data,
        ...select,
      })
    },
  },
)
