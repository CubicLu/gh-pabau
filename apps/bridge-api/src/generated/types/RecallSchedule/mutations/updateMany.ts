import { mutationField, nonNull } from 'nexus'

export const RecallScheduleUpdateManyMutation = mutationField(
  'updateManyRecallSchedule',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'RecallScheduleWhereInput',
      data: nonNull('RecallScheduleUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.recallSchedule.updateMany(args as any)
    },
  },
)
