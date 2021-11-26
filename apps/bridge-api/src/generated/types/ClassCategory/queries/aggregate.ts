import { queryField, list } from 'nexus'

export const ClassCategoryAggregateQuery = queryField(
  'aggregateClassCategory',
  {
    type: 'AggregateClassCategory',
    args: {
      where: 'ClassCategoryWhereInput',
      orderBy: list('ClassCategoryOrderByWithRelationInput'),
      cursor: 'ClassCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classCategory.aggregate({ ...args, ...select }) as any
    },
  },
)
