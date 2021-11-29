import { mutationField, nonNull } from 'nexus'

export const InvWarehouseUpdateManyMutation = mutationField(
  'updateManyInvWarehouse',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvWarehouseUpdateManyMutationInput'),
      where: 'InvWarehouseWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouse.updateMany(args as any)
    },
  },
)
