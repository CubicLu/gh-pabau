import { queryField, nonNull, list } from 'nexus'

export const InvWarehouseFindManyQuery = queryField('findManyInvWarehouse', {
  type: nonNull(list(nonNull('InvWarehouse'))),
  args: {
    where: 'InvWarehouseWhereInput',
    orderBy: list('InvWarehouseOrderByWithRelationInput'),
    cursor: 'InvWarehouseWhereUniqueInput',
    distinct: 'InvWarehouseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invWarehouse.findMany({
      ...args,
      ...select,
    })
  },
})
