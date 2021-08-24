import { mutationField, nonNull } from 'nexus'

export const InventoryMovementDeleteOneMutation = mutationField(
  'deleteOneInventoryMovement',
  {
    type: 'InventoryMovement',
    args: {
      where: nonNull('InventoryMovementWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.inventoryMovement.delete({
        where,
        ...select,
      })
    },
  },
)
