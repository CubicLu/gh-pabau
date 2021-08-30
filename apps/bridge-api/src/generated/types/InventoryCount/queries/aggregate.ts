import { queryField, list } from 'nexus'

export const InventoryCountAggregateQuery = queryField(
  'aggregateInventoryCount',
  {
    type: 'AggregateInventoryCount',
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByWithRelationInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      distinct: 'InventoryCountScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryCount.aggregate({ ...args, ...select }) as any
    },
  },
)
