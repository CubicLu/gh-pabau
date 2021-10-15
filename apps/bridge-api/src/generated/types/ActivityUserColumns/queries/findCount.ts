import { queryField, nonNull, list } from 'nexus'

export const ActivityUserColumnsFindCountQuery = queryField(
  'findManyActivityUserColumnsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityUserColumnsWhereInput',
      orderBy: list('ActivityUserColumnsOrderByInput'),
      cursor: 'ActivityUserColumnsWhereUniqueInput',
      distinct: 'ActivityUserColumnsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserColumns.count(args as any)
    },
  },
)
