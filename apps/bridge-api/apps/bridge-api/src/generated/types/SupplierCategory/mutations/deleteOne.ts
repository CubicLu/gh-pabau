import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryDeleteOneMutation = mutationField(
  'deleteOneSupplierCategory',
  {
    type: 'SupplierCategory',
    args: {
      where: nonNull('SupplierCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.supplierCategory.delete({
        where,
        ...select,
      })
    },
  },
)
