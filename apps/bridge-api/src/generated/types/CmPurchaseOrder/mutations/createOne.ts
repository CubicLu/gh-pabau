import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderCreateOneMutation = mutationField(
  'createOneCmPurchaseOrder',
  {
    type: nonNull('CmPurchaseOrder'),
    args: {
      data: nonNull('CmPurchaseOrderCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmPurchaseOrder.create({
        data,
        ...select,
      })
    },
  },
)
