import { queryField, nonNull, list } from 'nexus'

export const InvWarehouseProductFindManyQuery = queryField(
  'findManyInvWarehouseProduct',
  {
    type: nonNull(list(nonNull('InvWarehouseProduct'))),
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByWithRelationInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvWarehouseProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
