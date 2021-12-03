import { queryField, list } from 'nexus'

export const InvWarehouseProductFindFirstQuery = queryField(
  'findFirstInvWarehouseProduct',
  {
    type: 'InvWarehouseProduct',
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByWithRelationInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvWarehouseProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
