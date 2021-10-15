import { queryField, nonNull, list } from 'nexus'

export const InventoryCountFindCountQuery = queryField(
  'findManyInventoryCountCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InventoryCountWhereInput',
      orderBy: list('InventoryCountOrderByInput'),
      cursor: 'InventoryCountWhereUniqueInput',
      distinct: 'InventoryCountScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.inventoryCount.count(args as any)
    },
  },
)
