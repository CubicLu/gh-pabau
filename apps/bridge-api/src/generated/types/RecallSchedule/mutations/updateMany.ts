import { mutationField, nonNull } from 'nexus'

export const RecallScheduleUpdateManyMutation = mutationField(
  'updateManyRecallSchedule',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('RecallScheduleUpdateManyMutationInput'),
      where: 'RecallScheduleWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.recallSchedule.updateMany(args as any)
    },
  },
)
