import { queryField, nonNull, list } from 'nexus'

export const SupplierCategoryFindManyQuery = queryField(
  'findManySupplierCategory',
  {
    type: nonNull(list(nonNull('SupplierCategory'))),
    args: {
      where: 'SupplierCategoryWhereInput',
      orderBy: list('SupplierCategoryOrderByWithRelationInput'),
      cursor: 'SupplierCategoryWhereUniqueInput',
      distinct: 'SupplierCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.supplierCategory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
