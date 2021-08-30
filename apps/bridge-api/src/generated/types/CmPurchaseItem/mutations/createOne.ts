import { mutationField, nonNull } from 'nexus'

export const CmPurchaseItemCreateOneMutation = mutationField(
  'createOneCmPurchaseItem',
  {
    type: nonNull('CmPurchaseItem'),
    args: {
      data: nonNull('CmPurchaseItemCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmPurchaseItem.create({
        data,
        ...select,
      })
    },
  },
)
