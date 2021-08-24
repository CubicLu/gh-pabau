import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderUpsertOneMutation = mutationField(
  'upsertOneCmPurchaseOrder',
  {
    type: nonNull('CmPurchaseOrder'),
    args: {
      where: nonNull('CmPurchaseOrderWhereUniqueInput'),
      create: nonNull('CmPurchaseOrderCreateInput'),
      update: nonNull('CmPurchaseOrderUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseOrder.upsert({
        ...args,
        ...select,
      })
    },
  },
)
