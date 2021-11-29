import { queryField, nonNull, list } from 'nexus'

export const AvilableDatesLogFindCountQuery = queryField(
  'findManyAvilableDatesLogCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByWithRelationInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AvilableDatesLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.avilableDatesLog.count(args as any)
    },
  },
)
