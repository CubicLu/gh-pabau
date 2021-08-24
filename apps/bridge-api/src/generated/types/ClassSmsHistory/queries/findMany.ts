import { queryField, nonNull, list } from 'nexus'

export const ClassSmsHistoryFindManyQuery = queryField(
  'findManyClassSmsHistory',
  {
    type: nonNull(list(nonNull('ClassSmsHistory'))),
    args: {
      where: 'ClassSmsHistoryWhereInput',
      orderBy: list('ClassSmsHistoryOrderByInput'),
      cursor: 'ClassSmsHistoryWhereUniqueInput',
      distinct: 'ClassSmsHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classSmsHistory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
