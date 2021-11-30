import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderUpdateOneMutation = mutationField(
  'updateOneCmPurchaseOrder',
  {
    type: nonNull('CmPurchaseOrder'),
    args: {
      data: nonNull('CmPurchaseOrderUpdateInput'),
      where: nonNull('CmPurchaseOrderWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmPurchaseOrder.update({
        where,
        data,
        ...select,
      })
    },
  },
)
