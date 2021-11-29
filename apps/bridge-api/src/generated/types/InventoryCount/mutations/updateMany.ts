import { mutationField, nonNull } from 'nexus'

export const InventoryCountUpdateManyMutation = mutationField(
  'updateManyInventoryCount',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InventoryCountUpdateManyMutationInput'),
      where: 'InventoryCountWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryCount.updateMany(args as any)
    },
  },
)
