import { mutationField, nonNull } from 'nexus'

export const CheckinQueueCreateOneMutation = mutationField(
  'createOneCheckinQueue',
  {
    type: nonNull('CheckinQueue'),
    args: {
      data: nonNull('CheckinQueueCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.checkinQueue.create({
        data,
        ...select,
      })
    },
  },
)
