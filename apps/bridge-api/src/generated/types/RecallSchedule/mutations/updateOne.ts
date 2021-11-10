import { mutationField, nonNull } from 'nexus'

export const RecallScheduleUpdateOneMutation = mutationField(
  'updateOneRecallSchedule',
  {
    type: nonNull('RecallSchedule'),
    args: {
      where: nonNull('RecallScheduleWhereUniqueInput'),
      data: nonNull('RecallScheduleUpdateInput'),
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
