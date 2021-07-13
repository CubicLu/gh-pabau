import { queryField, nonNull } from 'nexus'

export const InvWarehouseFindUniqueQuery = queryField(
  'findUniqueInvWarehouse',
  {
    type: 'InvWarehouse',
    args: {
      where: nonNull('InvWarehouseWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.invWarehouse.findUnique({
        where,
        ...select,
      })
    },
  },
)
