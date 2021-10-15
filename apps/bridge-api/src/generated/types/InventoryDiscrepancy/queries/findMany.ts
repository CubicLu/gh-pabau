import { queryField, nonNull, list } from 'nexus'

export const InventoryDiscrepancyFindManyQuery = queryField(
  'findManyInventoryDiscrepancy',
  {
    type: nonNull(list(nonNull('InventoryDiscrepancy'))),
    args: {
      where: 'InventoryDiscrepancyWhereInput',
      orderBy: list('InventoryDiscrepancyOrderByInput'),
      cursor: 'InventoryDiscrepancyWhereUniqueInput',
      distinct: 'InventoryDiscrepancyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryDiscrepancy.findMany({
        ...args,
        ...select,
      })
    },
  },
)
