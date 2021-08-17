import { queryField, list } from 'nexus'

export const AvilableDatesLogAggregateQuery = queryField(
  'aggregateAvilableDatesLog',
  {
    type: 'AggregateAvilableDatesLog',
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      distinct: 'AvilableDatesLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.avilableDatesLog.aggregate({ ...args, ...select }) as any
    },
  },
)
