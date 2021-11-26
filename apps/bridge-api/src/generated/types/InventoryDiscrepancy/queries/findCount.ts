import { queryField, nonNull, list } from 'nexus'

export const InventoryDiscrepancyFindCountQuery = queryField(
  'findManyInventoryDiscrepancyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryDiscrepancyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryDiscrepancy.count(args as any)
    },
  },
)
