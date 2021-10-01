import { mutationField, nonNull } from 'nexus'

export const ActivityUserFiltersDeleteOneMutation = mutationField(
  'deleteOneActivityUserFilters',
  {
    type: 'ActivityUserFilters',
    args: {
      where: nonNull('ActivityUserFiltersWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.activityUserFilters.delete({
        where,
        ...select,
      })
    },
  },
)
