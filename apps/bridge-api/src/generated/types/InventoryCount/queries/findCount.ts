import { queryField, nonNull, list } from 'nexus'

export const InventoryCountFindCountQuery = queryField(
  'findManyInventoryCountCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByWithRelationInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InventoryCountScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryCount.count(args as any)
    },
  },
)
