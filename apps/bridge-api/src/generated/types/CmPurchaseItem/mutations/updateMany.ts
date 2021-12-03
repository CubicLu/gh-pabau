import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemUpdateManyMutation = mutationField(
  'updateManyCmPurchaseItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmPurchaseItemUpdateManyMutationInput'),
      where: 'CmPurchaseItemWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseItem.updateMany(args as any)
    },
  },
)
