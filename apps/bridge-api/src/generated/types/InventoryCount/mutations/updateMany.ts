import { mutationField, nonNull } from 'nexus'

export const InventoryCountUpdateManyMutation = mutationField(
  'updateManyInventoryCount',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InventoryCountWhereInput',
      data: nonNull('InventoryCountUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryCount.updateMany(args as any)
    },
  },
)
