import { queryField, list } from 'nexus'

export const InventoryMovementFindFirstQuery = queryField(
  'findFirstInventoryMovement',
  {
    type: 'InventoryMovement',
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByWithRelationInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryMovementScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryMovement.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
