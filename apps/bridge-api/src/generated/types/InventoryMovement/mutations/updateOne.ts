import { mutationField, nonNull } from 'nexus'

export const InventoryMovementUpdateOneMutation = mutationField(
  'updateOneInventoryMovement',
  {
    type: nonNull('InventoryMovement'),
    args: {
      where: nonNull('InventoryMovementWhereUniqueInput'),
      data: nonNull('InventoryMovementUpdateInput'),
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
