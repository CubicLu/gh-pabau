import { queryField, list } from 'nexus'

export const InvWarehouseProductAggregateQuery = queryField(
  'aggregateInvWarehouseProduct',
  {
    type: 'AggregateInvWarehouseProduct',
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      distinct: 'InvWarehouseProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.aggregate({ ...args, ...select }) as any
    },
  },
)
