import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemUpdateManyMutation = mutationField(
  'updateManyCmPurchaseItem',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmPurchaseItemWhereInput',
      data: nonNull('CmPurchaseItemUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmPurchaseItem.updateMany(args as any)
    },
  },
)
