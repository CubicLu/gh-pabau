import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemUpsertOneMutation = mutationField(
  'upsertOneCmPurchaseItem',
  {
    type: nonNull('CmPurchaseItem'),
    args: {
      where: nonNull('CmPurchaseItemWhereUniqueInput'),
      create: nonNull('CmPurchaseItemCreateInput'),
      update: nonNull('CmPurchaseItemUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmPurchaseItem.upsert({
        ...args,
        ...select,
      })
    },
  },
)
