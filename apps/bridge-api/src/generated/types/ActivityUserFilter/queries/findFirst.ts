import { queryField, list } from 'nexus'

export const ActivityUserFilterFindFirstQuery = queryField(
  'findFirstActivityUserFilter',
  {
    type: 'ActivityUserFilter',
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      distinct: 'ActivityUserFilterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilter.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
