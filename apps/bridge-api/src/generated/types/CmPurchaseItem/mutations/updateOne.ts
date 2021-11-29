import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemUpdateOneMutation = mutationField(
  'updateOneCmPurchaseItem',
  {
    type: nonNull('CmPurchaseItem'),
    args: {
      data: nonNull('CmPurchaseItemUpdateInput'),
      where: nonNull('CmPurchaseItemWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmPurchaseItem.update({
        where,
        data,
        ...select,
      })
    },
  },
)
