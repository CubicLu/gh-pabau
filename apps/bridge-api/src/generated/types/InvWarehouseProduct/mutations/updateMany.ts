import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductUpdateManyMutation = mutationField(
  'updateManyInvWarehouseProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvWarehouseProductUpdateManyMutationInput'),
      where: 'InvWarehouseProductWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouseProduct.updateMany(args as any)
    },
  },
)
