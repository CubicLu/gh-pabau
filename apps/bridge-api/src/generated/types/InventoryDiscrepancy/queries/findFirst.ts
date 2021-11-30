import { queryField, list } from 'nexus'

export const InventoryDiscrepancyFindFirstQuery = queryField(
  'findFirstInventoryDiscrepancy',
  {
    type: 'InventoryDiscrepancy',
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByWithRelationInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryDiscrepancyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
