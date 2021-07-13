import { mutationField, nonNull } from 'nexus'

export const InvWarehouseUpdateOneMutation = mutationField(
  'updateOneInvWarehouse',
  {
    type: nonNull('InvWarehouse'),
    args: {
      where: nonNull('InvWarehouseWhereUniqueInput'),
      data: nonNull('InvWarehouseUpdateInput'),
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
