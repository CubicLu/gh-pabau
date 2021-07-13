import { mutationField, nonNull } from 'nexus'

export const InvWarehouseUpdateManyMutation = mutationField(
  'updateManyInvWarehouse',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvWarehouseWhereInput',
      data: nonNull('InvWarehouseUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouse.updateMany(args as any)
    },
  },
)
