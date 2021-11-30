import { queryField, nonNull, list } from 'nexus'

export const ClassSmsHistoryFindManyQuery = queryField(
  'findManyClassSmsHistory',
  {
    type: nonNull(list(nonNull('ClassSmsHistory'))),
    args: {
      where: 'ClassSmsHistoryWhereInput',
      orderBy: list('ClassSmsHistoryOrderByWithRelationInput'),
      cursor: 'ClassSmsHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassSmsHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classSmsHistory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
