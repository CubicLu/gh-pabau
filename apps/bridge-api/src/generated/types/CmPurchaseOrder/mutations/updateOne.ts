import { mutationField, nonNull } from 'nexus'

export const CmPurchaseOrderUpdateOneMutation = mutationField(
  'updateOneCmPurchaseOrder',
  {
    type: nonNull('CmPurchaseOrder'),
    args: {
      where: nonNull('CmPurchaseOrderWhereUniqueInput'),
      data: nonNull('CmPurchaseOrderUpdateInput'),
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
