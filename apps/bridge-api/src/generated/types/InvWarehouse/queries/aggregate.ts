import { queryField, list } from 'nexus'

export const InvWarehouseAggregateQuery = queryField('aggregateInvWarehouse', {
  type: 'AggregateInvWarehouse',
  args: {
    where: 'InvWarehouseWhereInput',
    orderBy: list('InvWarehouseOrderByWithRelationInput'),
    cursor: 'InvWarehouseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invWarehouse.aggregate({ ...args, ...select }) as any
  },
})
