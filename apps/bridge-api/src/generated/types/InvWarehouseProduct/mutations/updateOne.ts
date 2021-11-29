import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductUpdateOneMutation = mutationField(
  'updateOneInvWarehouseProduct',
  {
    type: nonNull('InvWarehouseProduct'),
    args: {
      data: nonNull('InvWarehouseProductUpdateInput'),
      where: nonNull('InvWarehouseProductWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invWarehouseProduct.update({
        where,
        data,
        ...select,
      })
    },
  },
)
