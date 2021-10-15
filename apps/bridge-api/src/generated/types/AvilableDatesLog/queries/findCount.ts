import { queryField, nonNull, list } from 'nexus'

export const AvilableDatesLogFindCountQuery = queryField(
  'findManyAvilableDatesLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      distinct: 'AvilableDatesLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.avilableDatesLog.count(args as any)
    },
  },
)
