import { mutationField, nonNull } from 'nexus'

export const ActivityTypeCreateOneMutation = mutationField(
  'createOneActivityType',
  {
    type: nonNull('ActivityType'),
    args: {
      data: nonNull('ActivityTypeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.activityType.create({
        data,
        ...select,
      })
    },
  },
)
