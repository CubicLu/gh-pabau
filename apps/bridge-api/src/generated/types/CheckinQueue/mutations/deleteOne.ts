import { mutationField, nonNull } from 'nexus'

export const CheckinQueueDeleteOneMutation = mutationField(
  'deleteOneCheckinQueue',
  {
    type: 'CheckinQueue',
    args: {
      where: nonNull('CheckinQueueWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.checkinQueue.delete({
        where,
        ...select,
      })
    },
  },
)
