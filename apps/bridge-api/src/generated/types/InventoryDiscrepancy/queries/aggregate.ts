import { queryField, list } from 'nexus'

export const InventoryDiscrepancyAggregateQuery = queryField(
  'aggregateInventoryDiscrepancy',
  {
    type: 'AggregateInventoryDiscrepancy',
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      distinct: 'InventoryDiscrepancyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
