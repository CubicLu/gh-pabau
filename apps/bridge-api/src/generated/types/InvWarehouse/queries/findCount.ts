import { queryField, nonNull, list } from 'nexus'

export const InvWarehouseFindCountQuery = queryField(
  'findManyInvWarehouseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvWarehouseWhereInput',
      orderBy: list('InvWarehouseOrderByWithRelationInput'),
      cursor: 'InvWarehouseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvWarehouseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouse.count(args as any)
    },
  },
)
