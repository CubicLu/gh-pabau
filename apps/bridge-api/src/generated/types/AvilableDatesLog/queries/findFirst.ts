import { queryField, list } from 'nexus'

export const AvilableDatesLogFindFirstQuery = queryField(
  'findFirstAvilableDatesLog',
  {
    type: 'AvilableDatesLog',
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByWithRelationInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AvilableDatesLogScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.avilableDatesLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
