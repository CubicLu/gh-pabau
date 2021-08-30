import { queryField, list } from 'nexus'

export const InvWarehouseProductFindFirstQuery = queryField(
  'findFirstInvWarehouseProduct',
  {
    type: 'InvWarehouseProduct',
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      distinct: 'InvWarehouseProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
