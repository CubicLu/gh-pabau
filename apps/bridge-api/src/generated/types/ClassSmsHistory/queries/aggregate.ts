import { queryField, list } from 'nexus'

export const ClassSmsHistoryAggregateQuery = queryField(
  'aggregateClassSmsHistory',
  {
    type: 'AggregateClassSmsHistory',
    args: {
      where: 'ClassSmsHistoryWhereInput',
      orderBy: list('ClassSmsHistoryOrderByWithRelationInput'),
      cursor: 'ClassSmsHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classSmsHistory.aggregate({ ...args, ...select }) as any
    },
  },
)
