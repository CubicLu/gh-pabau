import { queryField, nonNull } from 'nexus'

export const InventoryDiscrepancyFindUniqueQuery = queryField(
  'findUniqueInventoryDiscrepancy',
  {
    type: 'InventoryDiscrepancy',
    args: {
      where: nonNull('InventoryDiscrepancyWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.inventoryDiscrepancy.findUnique({
        where,
        ...select,
      })
    },
  },
)
