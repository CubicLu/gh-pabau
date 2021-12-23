import { mutationField, nonNull } from 'nexus'

export const ServiceRetailProductUpsertOneMutation = mutationField(
  'upsertOneServiceRetailProduct',
  {
    type: nonNull('ServiceRetailProduct'),
    args: {
      where: nonNull('ServiceRetailProductWhereUniqueInput'),
      create: nonNull('ServiceRetailProductCreateInput'),
      update: nonNull('ServiceRetailProductUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceRetailProduct.upsert({
        ...args,
        ...select,
      })
    },
  },
)
