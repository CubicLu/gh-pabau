import { queryField, nonNull, list } from 'nexus'

export const InventoryCountFindManyQuery = queryField(
  'findManyInventoryCount',
  {
    type: nonNull(list(nonNull('InventoryCount'))),
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByWithRelationInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryCountScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryCount.findMany({
        ...args,
        ...select,
      })
    },
  },
)
