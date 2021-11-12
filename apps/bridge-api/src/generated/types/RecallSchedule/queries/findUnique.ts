import { queryField, nonNull } from 'nexus'

export const RecallScheduleFindUniqueQuery = queryField(
  'findUniqueRecallSchedule',
  {
    type: 'RecallSchedule',
    args: {
      where: nonNull('RecallScheduleWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.recallSchedule.findUnique({
        where,
        ...select,
      })
    },
  },
)
