import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryUpdateOneMutation = mutationField(
  'updateOneSupplierCategory',
  {
    type: nonNull('SupplierCategory'),
    args: {
      where: nonNull('SupplierCategoryWhereUniqueInput'),
      data: nonNull('SupplierCategoryUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.supplierCategory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
