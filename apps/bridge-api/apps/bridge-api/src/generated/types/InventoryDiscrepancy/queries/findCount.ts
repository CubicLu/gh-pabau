import { queryField, nonNull, list } from 'nexus'

export const InventoryDiscrepancyFindCountQuery = queryField(
  'findManyInventoryDiscrepancyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      distinct: 'InventoryDiscrepancyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryDiscrepancy.count(args as any)
    },
  },
)
