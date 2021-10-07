import { queryField, nonNull, list } from 'nexus'

export const InventoryCountFindManyQuery = queryField(
  'findManyInventoryCount',
  {
    type: nonNull(list(nonNull('InventoryCount'))),
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByWithRelationInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      distinct: 'InventoryCountScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.inventoryCount.findMany({
        ...args,
        ...select,
      })
    },
  },
)
