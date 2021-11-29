import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderUpdateManyMutation = mutationField(
  'updateManyCmPurchaseOrder',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmPurchaseOrderUpdateManyMutationInput'),
      where: 'CmPurchaseOrderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseOrder.updateMany(args as any)
    },
  },
)
