import { mutationField, nonNull } from 'nexus'

export const InventoryMovementUpdateOneMutation = mutationField(
  'updateOneInventoryMovement',
  {
    type: nonNull('InventoryMovement'),
    args: {
      data: nonNull('InventoryMovementUpdateInput'),
      where: nonNull('InventoryMovementWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.inventoryMovement.update({
        where,
        data,
        ...select,
      })
    },
  },
)
