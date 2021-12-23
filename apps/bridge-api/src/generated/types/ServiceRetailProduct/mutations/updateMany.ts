import { mutationField, nonNull } from 'nexus'

export const ServiceRetailProductUpdateManyMutation = mutationField(
  'updateManyServiceRetailProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceRetailProductUpdateManyMutationInput'),
      where: 'ServiceRetailProductWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceRetailProduct.updateMany(args as any)
    },
  },
)
