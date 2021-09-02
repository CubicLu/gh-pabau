import { queryField, list } from 'nexus'

export const InventoryMovementFindFirstQuery = queryField(
  'findFirstInventoryMovement',
  {
    type: 'InventoryMovement',
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByWithRelationInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      distinct: 'InventoryMovementScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryMovement.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
