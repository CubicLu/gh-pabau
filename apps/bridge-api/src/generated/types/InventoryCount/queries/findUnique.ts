import { queryField, nonNull } from 'nexus'

export const InventoryCountFindUniqueQuery = queryField(
  'findUniqueInventoryCount',
  {
    type: 'InventoryCount',
    args: {
      where: nonNull('InventoryCountWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.inventoryCount.findUnique({
        where,
        ...select,
      })
    },
  },
)
