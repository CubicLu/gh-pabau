import { mutationField, nonNull } from 'nexus'

export const InventoryMovementUpsertOneMutation = mutationField(
  'upsertOneInventoryMovement',
  {
    type: nonNull('InventoryMovement'),
    args: {
      where: nonNull('InventoryMovementWhereUniqueInput'),
      create: nonNull('InventoryMovementCreateInput'),
      update: nonNull('InventoryMovementUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryMovement.upsert({
        ...args,
        ...select,
      })
    },
  },
)
