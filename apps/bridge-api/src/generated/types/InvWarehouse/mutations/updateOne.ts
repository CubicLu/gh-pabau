import { mutationField, nonNull } from 'nexus'

export const InvWarehouseUpdateOneMutation = mutationField(
  'updateOneInvWarehouse',
  {
    type: nonNull('InvWarehouse'),
    args: {
      data: nonNull('InvWarehouseUpdateInput'),
      where: nonNull('InvWarehouseWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invWarehouse.update({
        where,
        data,
        ...select,
      })
    },
  },
)
