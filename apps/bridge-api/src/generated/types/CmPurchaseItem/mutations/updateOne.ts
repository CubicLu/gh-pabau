import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemUpdateOneMutation = mutationField(
  'updateOneCmPurchaseItem',
  {
    type: nonNull('CmPurchaseItem'),
    args: {
      where: nonNull('CmPurchaseItemWhereUniqueInput'),
      data: nonNull('CmPurchaseItemUpdateInput'),
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
