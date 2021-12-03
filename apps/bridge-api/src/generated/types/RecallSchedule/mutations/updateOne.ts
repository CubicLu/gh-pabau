import { mutationField, nonNull } from 'nexus'

export const RecallScheduleUpdateOneMutation = mutationField(
  'updateOneRecallSchedule',
  {
    type: nonNull('RecallSchedule'),
    args: {
      data: nonNull('RecallScheduleUpdateInput'),
      where: nonNull('RecallScheduleWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.recallSchedule.update({
        where,
        data,
        ...select,
      })
    },
  },
)
