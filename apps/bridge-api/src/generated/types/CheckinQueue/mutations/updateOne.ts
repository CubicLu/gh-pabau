import { mutationField, nonNull } from 'nexus'

export const CheckinQueueUpdateOneMutation = mutationField(
  'updateOneCheckinQueue',
  {
    type: nonNull('CheckinQueue'),
    args: {
      data: nonNull('CheckinQueueUpdateInput'),
      where: nonNull('CheckinQueueWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.checkinQueue.update({
        where,
        data,
        ...select,
      })
    },
  },
)
