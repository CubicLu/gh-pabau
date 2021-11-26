import { queryField, list } from 'nexus'

export const InventoryDiscrepancyAggregateQuery = queryField(
  'aggregateInventoryDiscrepancy',
  {
    type: 'AggregateInventoryDiscrepancy',
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
