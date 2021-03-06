import { queryField, list } from 'nexus'

export const RecallScheduleAggregateQuery = queryField(
  'aggregateRecallSchedule',
  {
    type: 'AggregateRecallSchedule',
    args: {
      where: 'RecallScheduleWhereInput',
      orderBy: list('RecallScheduleOrderByWithRelationInput'),
      cursor: 'RecallScheduleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.recallSchedule.aggregate({ ...args, ...select }) as any
    },
  },
)
