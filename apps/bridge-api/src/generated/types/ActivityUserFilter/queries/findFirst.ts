import { queryField, list } from 'nexus'

export const ActivityUserFilterFindFirstQuery = queryField(
  'findFirstActivityUserFilter',
  {
    type: 'ActivityUserFilter',
    args: {
      where: 'ActivityUserFilterWhereInput',
      orderBy: list('ActivityUserFilterOrderByWithRelationInput'),
      cursor: 'ActivityUserFilterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ActivityUserFilterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserFilter.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
