import { mutationField, nonNull } from 'nexus'

export const RecallScheduleCreateOneMutation = mutationField(
  'createOneRecallSchedule',
  {
    type: nonNull('RecallSchedule'),
    args: {
      data: nonNull('RecallScheduleCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.recallSchedule.create({
        data,
        ...select,
      })
    },
  },
)
