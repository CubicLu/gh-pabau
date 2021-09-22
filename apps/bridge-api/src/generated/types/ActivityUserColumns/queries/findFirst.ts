import { queryField, list } from 'nexus'

export const ActivityUserColumnsFindFirstQuery = queryField(
  'findFirstActivityUserColumns',
  {
    type: 'ActivityUserColumns',
    args: {
      where: 'ActivityUserColumnsWhereInput',
      orderBy: list('ActivityUserColumnsOrderByWithRelationInput'),
      cursor: 'ActivityUserColumnsWhereUniqueInput',
      distinct: 'ActivityUserColumnsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserColumns.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
