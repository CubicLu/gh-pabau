import { queryField, nonNull, list } from 'nexus'

export const ActivityUserColumnsFindManyQuery = queryField(
  'findManyActivityUserColumns',
  {
    type: nonNull(list(nonNull('ActivityUserColumns'))),
    args: {
      where: 'ActivityUserColumnsWhereInput',
      orderBy: list('ActivityUserColumnsOrderByInput'),
      cursor: 'ActivityUserColumnsWhereUniqueInput',
      distinct: 'ActivityUserColumnsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserColumns.findMany({
        ...args,
        ...select,
      })
    },
  },
)
