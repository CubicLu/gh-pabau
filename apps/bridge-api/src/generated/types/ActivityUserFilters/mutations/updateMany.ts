import { mutationField, nonNull } from 'nexus'

export const ActivityUserFiltersUpdateManyMutation = mutationField(
  'updateManyActivityUserFilters',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ActivityUserFiltersWhereInput',
      data: nonNull('ActivityUserFiltersUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserFilters.updateMany(args as any)
    },
  },
)
