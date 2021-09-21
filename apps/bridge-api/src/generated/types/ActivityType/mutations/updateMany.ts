import { mutationField, nonNull } from 'nexus'

export const ActivityTypeUpdateManyMutation = mutationField(
  'updateManyActivityType',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ActivityTypeWhereInput',
      data: nonNull('ActivityTypeUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityType.updateMany(args as any)
    },
  },
)
