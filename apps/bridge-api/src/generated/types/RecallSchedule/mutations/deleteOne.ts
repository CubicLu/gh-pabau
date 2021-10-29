import { mutationField, nonNull } from 'nexus'

export const RecallScheduleDeleteOneMutation = mutationField(
  'deleteOneRecallSchedule',
  {
    type: 'RecallSchedule',
    args: {
      where: nonNull('RecallScheduleWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.recallSchedule.delete({
        where,
        ...select,
      })
    },
  },
)
