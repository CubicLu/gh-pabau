import { queryField, list } from 'nexus'

export const InventoryCountFindFirstQuery = queryField(
  'findFirstInventoryCount',
  {
    type: 'InventoryCount',
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByWithRelationInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      distinct: 'InventoryCountScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryCount.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
