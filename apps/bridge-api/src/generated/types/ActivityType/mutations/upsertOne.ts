import { mutationField, nonNull } from 'nexus'

export const ActivityTypeUpsertOneMutation = mutationField(
  'upsertOneActivityType',
  {
    type: nonNull('ActivityType'),
    args: {
      where: nonNull('ActivityTypeWhereUniqueInput'),
      create: nonNull('ActivityTypeCreateInput'),
      update: nonNull('ActivityTypeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityType.upsert({
        ...args,
        ...select,
      })
    },
  },
)
