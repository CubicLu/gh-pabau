import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderUpdateManyMutation = mutationField(
  'updateManyCmPurchaseOrder',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmPurchaseOrderWhereInput',
      data: nonNull('CmPurchaseOrderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseOrder.updateMany(args as any)
    },
  },
)
