import { queryField, list } from 'nexus'

export const InventoryDiscrepancyFindFirstQuery = queryField(
  'findFirstInventoryDiscrepancy',
  {
    type: 'InventoryDiscrepancy',
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      distinct: 'InventoryDiscrepancyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
