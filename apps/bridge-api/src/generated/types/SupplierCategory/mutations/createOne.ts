import { mutationField, nonNull } from 'nexus'

export const SupplierCategoryCreateOneMutation = mutationField(
  'createOneSupplierCategory',
  {
    type: nonNull('SupplierCategory'),
    args: {
      data: nonNull('SupplierCategoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.supplierCategory.create({
        data,
        ...select,
      })
    },
  },
)
