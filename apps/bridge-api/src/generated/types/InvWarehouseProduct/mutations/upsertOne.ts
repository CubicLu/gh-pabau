import { mutationField, nonNull } from 'nexus'

export const InvWarehouseProductUpsertOneMutation = mutationField(
  'upsertOneInvWarehouseProduct',
  {
    type: nonNull('InvWarehouseProduct'),
    args: {
      where: nonNull('InvWarehouseProductWhereUniqueInput'),
      create: nonNull('InvWarehouseProductCreateInput'),
      update: nonNull('InvWarehouseProductUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invWarehouseProduct.upsert({
        ...args,
        ...select,
      })
    },
  },
)
