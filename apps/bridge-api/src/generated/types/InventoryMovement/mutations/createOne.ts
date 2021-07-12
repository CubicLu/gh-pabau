import { mutationField, nonNull } from 'nexus'

export const InventoryMovementCreateOneMutation = mutationField(
  'createOneInventoryMovement',
  {
    type: nonNull('InventoryMovement'),
    args: {
      data: nonNull('InventoryMovementCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.inventoryMovement.create({
        data,
        ...select,
      })
    },
  },
)
