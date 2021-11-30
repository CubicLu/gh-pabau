import { queryField, list } from 'nexus'

export const InvWarehouseProductAggregateQuery = queryField(
  'aggregateInvWarehouseProduct',
  {
    type: 'AggregateInvWarehouseProduct',
    args: {
      where: 'InvWarehouseProductWhereInput',
      orderBy: list('InvWarehouseProductOrderByWithRelationInput'),
      cursor: 'InvWarehouseProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.aggregate({ ...args, ...select }) as any
    },
  },
)
