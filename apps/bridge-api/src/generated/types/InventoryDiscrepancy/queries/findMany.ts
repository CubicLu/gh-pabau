import { queryField, nonNull, list } from 'nexus'

export const InventoryDiscrepancyFindManyQuery = queryField(
  'findManyInventoryDiscrepancy',
  {
    type: nonNull(list(nonNull('InventoryDiscrepancy'))),
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryDiscrepancyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.findMany({
        ...args,
        ...select,
      })
    },
  },
)
