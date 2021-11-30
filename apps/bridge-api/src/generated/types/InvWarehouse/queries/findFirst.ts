import { queryField, list } from 'nexus'

export const InvWarehouseFindFirstQuery = queryField('findFirstInvWarehouse', {
  type: 'InvWarehouse',
  args: {
    where: 'InvWarehouseWhereInput',
    orderBy: list('InvWarehouseOrderByWithRelationInput'),
    cursor: 'InvWarehouseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvWarehouseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invWarehouse.findFirst({
      ...args,
      ...select,
    })
  },
})
