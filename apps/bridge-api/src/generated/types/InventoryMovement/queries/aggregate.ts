import { queryField, list } from 'nexus'

export const InventoryMovementAggregateQuery = queryField(
  'aggregateInventoryMovement',
  {
    type: 'AggregateInventoryMovement',
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByWithRelationInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryMovement.aggregate({ ...args, ...select }) as any
    },
  },
)
