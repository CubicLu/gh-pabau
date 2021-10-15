import { queryField, nonNull, list } from 'nexus'

export const SupplierCategoryFindCountQuery = queryField(
  'findManySupplierCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SupplierCategoryWhereInput',
      orderBy: list('SupplierCategoryOrderByInput'),
      cursor: 'SupplierCategoryWhereUniqueInput',
      distinct: 'SupplierCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.supplierCategory.count(args as any)
    },
  },
)
