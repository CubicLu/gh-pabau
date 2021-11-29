import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryUpdateOneMutation = mutationField(
  'updateOneSupplierCategory',
  {
    type: nonNull('SupplierCategory'),
    args: {
      data: nonNull('SupplierCategoryUpdateInput'),
      where: nonNull('SupplierCategoryWhereUniqueInput'),
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
