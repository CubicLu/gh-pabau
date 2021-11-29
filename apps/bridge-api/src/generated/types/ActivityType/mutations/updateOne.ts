import { mutationField, nonNull } from 'nexus'

export const ActivityTypeUpdateOneMutation = mutationField(
  'updateOneActivityType',
  {
    type: nonNull('ActivityType'),
    args: {
      data: nonNull('ActivityTypeUpdateInput'),
      where: nonNull('ActivityTypeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.activityType.update({
        where,
        data,
        ...select,
      })
    },
  },
)
