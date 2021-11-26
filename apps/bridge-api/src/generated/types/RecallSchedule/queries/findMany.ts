import { queryField, nonNull, list } from 'nexus'

export const RecallScheduleFindManyQuery = queryField(
  'findManyRecallSchedule',
  {
    type: nonNull(list(nonNull('RecallSchedule'))),
    args: {
      where: 'RecallScheduleWhereInput',
      orderBy: list('RecallScheduleOrderByWithRelationInput'),
      cursor: 'RecallScheduleWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('RecallScheduleScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.recallSchedule.findMany({
        ...args,
        ...select,
      })
    },
  },
)
