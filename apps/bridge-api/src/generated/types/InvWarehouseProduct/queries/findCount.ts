import { queryField, nonNull, list } from 'nexus'

export const InvWarehouseProductFindCountQuery = queryField(
  'findManyInvWarehouseProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByWithRelationInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      distinct: 'InvWarehouseProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invWarehouseProduct.count(args as any)
    },
  },
)
