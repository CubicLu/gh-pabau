import { queryField, nonNull, list } from 'nexus'

export const SupplierCategoryFindCountQuery = queryField(
  'findManySupplierCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SupplierCategoryWhereInput',
      orderBy: list('SupplierCategoryOrderByWithRelationInput'),
      cursor: 'SupplierCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SupplierCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.supplierCategory.count(args as any)
    },
  },
)
