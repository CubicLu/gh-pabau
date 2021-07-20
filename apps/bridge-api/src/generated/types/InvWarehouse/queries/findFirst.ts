import { queryField, list } from 'nexus'

export const InvWarehouseFindFirstQuery = queryField('findFirstInvWarehouse', {
  type: 'InvWarehouse',
  args: {
    where: 'InvWarehouseWhereInput',
    orderBy: list('InvWarehouseOrderByInput'),
    cursor: 'InvWarehouseWhereUniqueInput',
    distinct: 'InvWarehouseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invWarehouse.findFirst({
      ...args,
      ...select,
    })
  },
})
