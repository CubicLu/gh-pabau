import { mutationField, nonNull } from 'nexus'

export const ActivityTypeUpdateManyMutation = mutationField(
  'updateManyActivityType',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ActivityTypeUpdateManyMutationInput'),
      where: 'ActivityTypeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityType.updateMany(args as any)
    },
  },
)
