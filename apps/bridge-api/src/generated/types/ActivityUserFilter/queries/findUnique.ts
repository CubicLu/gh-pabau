import { queryField, nonNull } from 'nexus'

export const ActivityUserFilterFindUniqueQuery = queryField(
  'findUniqueActivityUserFilter',
  {
    type: 'ActivityUserFilter',
    args: {
      where: nonNull('ActivityUserFilterWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.activityUserFilter.findUnique({
        where,
        ...select,
      })
    },
  },
)
