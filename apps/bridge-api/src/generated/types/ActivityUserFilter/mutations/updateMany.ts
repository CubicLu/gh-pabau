import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterUpdateManyMutation = mutationField(
  'updateManyActivityUserFilter',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ActivityUserFilterUpdateManyMutationInput'),
      where: 'ActivityUserFilterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserFilter.updateMany(args as any)
    },
  },
)
