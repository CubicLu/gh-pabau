import { queryField, nonNull, list } from 'nexus'

export const ActivityUserFilterFindManyQuery = queryField(
  'findManyActivityUserFilter',
  {
    type: nonNull(list(nonNull('ActivityUserFilter'))),
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByWithRelationInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      distinct: 'ActivityUserFilterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilter.findMany({
        ...args,
        ...select,
      })
    },
  },
)
