import { queryField, list } from 'nexus'

export const InventoryMovementAggregateQuery = queryField(
  'aggregateInventoryMovement',
  {
    type: 'AggregateInventoryMovement',
    args: {
      where: 'InventoryMovementWhereInput',
      orderBy: list('InventoryMovementOrderByInput'),
      cursor: 'InventoryMovementWhereUniqueInput',
      distinct: 'InventoryMovementScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryMovement.aggregate({ ...args, ...select }) as any
    },
  },
)
