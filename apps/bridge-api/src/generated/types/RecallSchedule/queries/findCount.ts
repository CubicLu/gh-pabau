import { queryField, nonNull, list } from 'nexus'

export const RecallScheduleFindCountQuery = queryField(
  'findManyRecallScheduleCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'RecallScheduleWhereInput',
      orderBy: list('RecallScheduleOrderByWithRelationInput'),
      cursor: 'RecallScheduleWhereUniqueInput',
      distinct: 'RecallScheduleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.recallSchedule.count(args as any)
    },
  },
)
