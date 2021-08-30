import { queryField, nonNull, list } from 'nexus'

export const InvWarehouseFindCountQuery = queryField(
  'findManyInvWarehouseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvWarehouseWhereInput',
      orderBy: list('InvWarehouseOrderByWithRelationInput'),
      cursor: 'InvWarehouseWhereUniqueInput',
      distinct: 'InvWarehouseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouse.count(args as any)
    },
  },
)
