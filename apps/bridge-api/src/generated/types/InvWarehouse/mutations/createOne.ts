import { mutationField, nonNull } from 'nexus'

export const InvWarehouseCreateOneMutation = mutationField(
  'createOneInvWarehouse',
  {
    type: nonNull('InvWarehouse'),
    args: {
      data: nonNull('InvWarehouseCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invWarehouse.create({
        data,
        ...select,
      })
    },
  },
)
