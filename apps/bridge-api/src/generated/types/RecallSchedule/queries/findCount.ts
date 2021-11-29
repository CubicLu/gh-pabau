import { queryField, nonNull, list } from 'nexus'

export const RecallScheduleFindCountQuery = queryField(
  'findManyRecallScheduleCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'RecallScheduleWhereInput',
      orderBy: list('RecallScheduleOrderByWithRelationInput'),
      cursor: 'RecallScheduleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('RecallScheduleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.recallSchedule.count(args as any)
    },
  },
)
