import { queryField, nonNull } from 'nexus'

export const ActivityUserFiltersFindUniqueQuery = queryField(
  'findUniqueActivityUserFilters',
  {
    type: 'ActivityUserFilters',
    args: {
      where: nonNull('ActivityUserFiltersWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.activityUserFilters.findUnique({
        where,
        ...select,
      })
    },
  },
)
