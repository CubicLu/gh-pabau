import { mutationField, nonNull } from 'nexus'

export const ActivityUserFilterUpdateManyMutation = mutationField(
  'updateManyActivityUserFilter',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ActivityUserFilterWhereInput',
      data: nonNull('ActivityUserFilterUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserFilter.updateMany(args as any)
    },
  },
)
