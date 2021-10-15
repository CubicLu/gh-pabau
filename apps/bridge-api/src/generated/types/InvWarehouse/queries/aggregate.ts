import { queryField, list } from 'nexus'

export const InvWarehouseAggregateQuery = queryField('aggregateInvWarehouse', {
  type: 'AggregateInvWarehouse',
  args: {
    where: 'InvWarehouseWhereInput',
    orderBy: list('InvWarehouseOrderByInput'),
    cursor: 'InvWarehouseWhereUniqueInput',
    distinct: 'InvWarehouseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invWarehouse.aggregate({ ...args, ...select }) as any
  },
})
