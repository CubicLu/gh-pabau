import { queryField, list } from 'nexus'

export const SupplierCategoryFindFirstQuery = queryField(
  'findFirstSupplierCategory',
  {
    type: 'SupplierCategory',
    args: {
      where: 'SupplierCategoryWhereInput',
      orderBy: list('SupplierCategoryOrderByWithRelationInput'),
      cursor: 'SupplierCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SupplierCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.supplierCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
