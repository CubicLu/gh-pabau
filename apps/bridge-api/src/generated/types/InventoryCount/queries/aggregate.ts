import { queryField, list } from 'nexus'

export const InventoryCountAggregateQuery = queryField(
  'aggregateInventoryCount',
  {
    type: 'AggregateInventoryCount',
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByWithRelationInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryCount.aggregate({ ...args, ...select }) as any
    },
  },
)
