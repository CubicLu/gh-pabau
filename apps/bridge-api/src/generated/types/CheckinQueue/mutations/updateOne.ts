import { mutationField, nonNull } from 'nexus'

export const CheckinQueueUpdateOneMutation = mutationField(
  'updateOneCheckinQueue',
  {
    type: nonNull('CheckinQueue'),
    args: {
      where: nonNull('CheckinQueueWhereUniqueInput'),
      data: nonNull('CheckinQueueUpdateInput'),
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
