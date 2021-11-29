import { queryField, list } from 'nexus'

export const RecallScheduleFindFirstQuery = queryField(
  'findFirstRecallSchedule',
  {
    type: 'RecallSchedule',
    args: {
      where: 'RecallScheduleWhereInput',
      orderBy: list('RecallScheduleOrderByWithRelationInput'),
      cursor: 'RecallScheduleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('RecallScheduleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.recallSchedule.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
