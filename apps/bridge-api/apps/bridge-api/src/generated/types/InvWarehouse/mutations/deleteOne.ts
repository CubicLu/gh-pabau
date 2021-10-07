import { mutationField, nonNull } from 'nexus'

export const InvWarehouseDeleteOneMutation = mutationField(
  'deleteOneInvWarehouse',
  {
    type: 'InvWarehouse',
    args: {
      where: nonNull('InvWarehouseWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invWarehouse.delete({
        where,
        ...select,
      })
    },
  },
)
