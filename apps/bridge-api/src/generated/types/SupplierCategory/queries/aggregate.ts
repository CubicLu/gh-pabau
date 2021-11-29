import { queryField, list } from 'nexus'

export const SupplierCategoryAggregateQuery = queryField(
  'aggregateSupplierCategory',
  {
    type: 'AggregateSupplierCategory',
    args: {
      where: 'SupplierCategoryWhereInput',
      orderBy: list('SupplierCategoryOrderByWithRelationInput'),
      cursor: 'SupplierCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.supplierCategory.aggregate({ ...args, ...select }) as any
    },
  },
)
