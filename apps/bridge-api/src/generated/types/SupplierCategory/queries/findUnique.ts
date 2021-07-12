import { queryField, nonNull } from 'nexus'

export const SupplierCategoryFindUniqueQuery = queryField(
  'findUniqueSupplierCategory',
  {
    type: 'SupplierCategory',
    args: {
      where: nonNull('SupplierCategoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.supplierCategory.findUnique({
        where,
        ...select,
      })
    },
  },
)
