import { queryField, list } from 'nexus'

export const SupplierCategoryFindFirstQuery = queryField(
  'findFirstSupplierCategory',
  {
    type: 'SupplierCategory',
    args: {
      where: 'SupplierCategoryWhereInput',
      orderBy: list('SupplierCategoryOrderByInput'),
      cursor: 'SupplierCategoryWhereUniqueInput',
      distinct: 'SupplierCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.supplierCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
