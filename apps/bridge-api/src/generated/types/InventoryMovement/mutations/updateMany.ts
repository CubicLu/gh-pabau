import { mutationField, nonNull } from 'nexus'

export const InventoryMovementUpdateManyMutation = mutationField(
  'updateManyInventoryMovement',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InventoryMovementWhereInput',
      data: nonNull('InventoryMovementUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryMovement.updateMany(args as any)
    },
  },
)
