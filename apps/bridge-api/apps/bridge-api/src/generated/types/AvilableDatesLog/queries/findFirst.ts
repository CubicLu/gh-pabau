import { queryField, list } from 'nexus'

export const AvilableDatesLogFindFirstQuery = queryField(
  'findFirstAvilableDatesLog',
  {
    type: 'AvilableDatesLog',
    args: {
      where: 'AvilableDatesLogWhereInput',
      orderBy: list('AvilableDatesLogOrderByWithRelationInput'),
      cursor: 'AvilableDatesLogWhereUniqueInput',
      distinct: 'AvilableDatesLogScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.avilableDatesLog.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
