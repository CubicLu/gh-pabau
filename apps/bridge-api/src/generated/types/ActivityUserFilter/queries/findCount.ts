import { queryField, nonNull, list } from 'nexus'

export const ActivityUserFilterFindCountQuery = queryField(
  'findManyActivityUserFilterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByWithRelationInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ActivityUserFilterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserFilter.count(args as any)
    },
  },
)
