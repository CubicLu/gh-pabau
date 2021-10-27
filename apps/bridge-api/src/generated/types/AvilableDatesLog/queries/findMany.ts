import { queryField, nonNull, list } from 'nexus'

export const AvilableDatesLogFindManyQuery = queryField(
  'findManyAvilableDatesLog',
  {
    type: nonNull(list(nonNull('AvilableDatesLog'))),
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByWithRelationInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      distinct: 'AvilableDatesLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.avilableDatesLog.findMany({
        ...args,
        ...select,
      })
    },
  },
)
