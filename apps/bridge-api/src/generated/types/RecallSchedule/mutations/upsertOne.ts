import { mutationField, nonNull } from 'nexus'

export const RecallScheduleUpsertOneMutation = mutationField(
  'upsertOneRecallSchedule',
  {
    type: nonNull('RecallSchedule'),
    args: {
      where: nonNull('RecallScheduleWhereUniqueInput'),
      create: nonNull('RecallScheduleCreateInput'),
      update: nonNull('RecallScheduleUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.recallSchedule.upsert({
        ...args,
        ...select,
      })
    },
  },
)
