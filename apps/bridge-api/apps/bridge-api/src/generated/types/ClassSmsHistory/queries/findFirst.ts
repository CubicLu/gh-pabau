import { queryField, list } from 'nexus'

export const ClassSmsHistoryFindFirstQuery = queryField(
  'findFirstClassSmsHistory',
  {
    type: 'ClassSmsHistory',
    args: {
      where: 'ClassSmsHistoryWhereInput',
      orderBy: list('ClassSmsHistoryOrderByWithRelationInput'),
      cursor: 'ClassSmsHistoryWhereUniqueInput',
      distinct: 'ClassSmsHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classSmsHistory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
