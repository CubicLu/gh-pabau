import { mutationField, nonNull } from 'nexus'

export const ActivityTypeDeleteOneMutation = mutationField(
  'deleteOneActivityType',
  {
    type: 'ActivityType',
    args: {
      where: nonNull('ActivityTypeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.activityType.delete({
        where,
        ...select,
      })
    },
  },
)
