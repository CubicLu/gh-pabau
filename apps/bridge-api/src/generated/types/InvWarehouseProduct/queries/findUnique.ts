import { queryField, nonNull } from 'nexus'

export const InvWarehouseProductFindUniqueQuery = queryField(
  'findUniqueInvWarehouseProduct',
  {
    type: 'InvWarehouseProduct',
    args: {
      where: nonNull('InvWarehouseProductWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.invWarehouseProduct.findUnique({
        where,
        ...select,
      })
    },
  },
)
