import { queryField, list } from 'nexus'

export const ActivityUserColumnsAggregateQuery = queryField(
  'aggregateActivityUserColumns',
  {
    type: 'AggregateActivityUserColumns',
    args: {
      where: 'ActivityUserColumnsWhereInput',
      orderBy: list('ActivityUserColumnsOrderByInput'),
      cursor: 'ActivityUserColumnsWhereUniqueInput',
      distinct: 'ActivityUserColumnsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserColumns.aggregate({ ...args, ...select }) as any
    },
  },
)
