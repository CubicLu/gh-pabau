import { queryField, nonNull, list } from 'nexus'

export const InvWarehouseProductFindManyQuery = queryField(
  'findManyInvWarehouseProduct',
  {
    type: nonNull(list(nonNull('InvWarehouseProduct'))),
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByWithRelationInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      distinct: 'InvWarehouseProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
