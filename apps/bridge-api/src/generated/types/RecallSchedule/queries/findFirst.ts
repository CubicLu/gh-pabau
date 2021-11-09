import { queryField, list } from 'nexus'

export const RecallScheduleFindFirstQuery = queryField(
  'findFirstRecallSchedule',
  {
    type: 'RecallSchedule',
    args: {
      where: 'RecallScheduleWhereInput',
      orderBy: list('RecallScheduleOrderByWithRelationInput'),
      cursor: 'RecallScheduleWhereUniqueInput',
      distinct: 'RecallScheduleScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.recallSchedule.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
