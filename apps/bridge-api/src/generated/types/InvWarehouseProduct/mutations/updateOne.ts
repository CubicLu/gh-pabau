import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductUpdateOneMutation = mutationField(
  'updateOneInvWarehouseProduct',
  {
    type: nonNull('InvWarehouseProduct'),
    args: {
      where: nonNull('InvWarehouseProductWhereUniqueInput'),
      data: nonNull('InvWarehouseProductUpdateInput'),
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
