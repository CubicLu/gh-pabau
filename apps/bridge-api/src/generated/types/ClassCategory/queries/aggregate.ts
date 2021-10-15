import { queryField, list } from 'nexus'

export const ClassCategoryAggregateQuery = queryField(
  'aggregateClassCategory',
  {
    type: 'AggregateClassCategory',
    args: {
      where: 'ClassCategoryWhereInput',
      orderBy: list('ClassCategoryOrderByInput'),
      cursor: 'ClassCategoryWhereUniqueInput',
      distinct: 'ClassCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classCategory.aggregate({ ...args, ...select }) as any
    },
  },
)
