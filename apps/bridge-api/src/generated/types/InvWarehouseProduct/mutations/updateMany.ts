import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductUpdateManyMutation = mutationField(
  'updateManyInvWarehouseProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvWarehouseProductWhereInput',
      data: nonNull('InvWarehouseProductUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouseProduct.updateMany(args as any)
    },
  },
)
