import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductCreateOneMutation = mutationField(
  'createOneInvWarehouseProduct',
  {
    type: nonNull('InvWarehouseProduct'),
    args: {
      data: nonNull('InvWarehouseProductCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invWarehouseProduct.create({
        data,
        ...select,
      })
    },
  },
)
