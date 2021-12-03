import { queryField, nonNull, list } from 'nexus'

export const InventoryMovementFindCountQuery = queryField(
  'findManyInventoryMovementCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByWithRelationInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryMovementScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryMovement.count(args as any)
    },
  },
)
