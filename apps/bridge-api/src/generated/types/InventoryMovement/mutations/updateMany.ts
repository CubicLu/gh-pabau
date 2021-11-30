import { mutationField, nonNull } from 'nexus'

export const InventoryMovementUpdateManyMutation = mutationField(
  'updateManyInventoryMovement',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InventoryMovementUpdateManyMutationInput'),
      where: 'InventoryMovementWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryMovement.updateMany(args as any)
    },
  },
)
