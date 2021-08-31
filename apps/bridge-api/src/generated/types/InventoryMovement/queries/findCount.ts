import { queryField, nonNull, list } from 'nexus'

export const InventoryMovementFindCountQuery = queryField(
  'findManyInventoryMovementCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByWithRelationInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      distinct: 'InventoryMovementScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryMovement.count(args as any)
    },
  },
)
