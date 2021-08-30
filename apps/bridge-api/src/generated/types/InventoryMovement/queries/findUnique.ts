import { queryField, nonNull } from 'nexus'

export const InventoryMovementFindUniqueQuery = queryField(
  'findUniqueInventoryMovement',
  {
    type: 'InventoryMovement',
    args: {
      where: nonNull('InventoryMovementWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.inventoryMovement.findUnique({
        where,
        ...select,
      })
    },
  },
)
