import { mutationField, nonNull } from 'nexus'

export const ActivityTypeUpdateOneMutation = mutationField(
  'updateOneActivityType',
  {
    type: nonNull('ActivityType'),
    args: {
      where: nonNull('ActivityTypeWhereUniqueInput'),
      data: nonNull('ActivityTypeUpdateInput'),
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
