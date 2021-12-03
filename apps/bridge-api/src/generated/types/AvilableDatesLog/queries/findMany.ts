import { queryField, nonNull, list } from 'nexus'

export const AvilableDatesLogFindManyQuery = queryField(
  'findManyAvilableDatesLog',
  {
    type: nonNull(list(nonNull('AvilableDatesLog'))),
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByWithRelationInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AvilableDatesLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.avilableDatesLog.findMany({
        ...args,
        ...select,
      })
    },
  },
)
