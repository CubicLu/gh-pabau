import { mutationField, nonNull } from 'nexus'

export const CheckinQueueUpsertOneMutation = mutationField(
  'upsertOneCheckinQueue',
  {
    type: nonNull('CheckinQueue'),
    args: {
      where: nonNull('CheckinQueueWhereUniqueInput'),
      create: nonNull('CheckinQueueCreateInput'),
      update: nonNull('CheckinQueueUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinQueue.upsert({
        ...args,
        ...select,
      })
    },
  },
)
