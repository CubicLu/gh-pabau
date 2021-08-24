import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductDeleteOneMutation = mutationField(
  'deleteOneInvWarehouseProduct',
  {
    type: 'InvWarehouseProduct',
    args: {
      where: nonNull('InvWarehouseProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invWarehouseProduct.delete({
        where,
        ...select,
      })
    },
  },
)
