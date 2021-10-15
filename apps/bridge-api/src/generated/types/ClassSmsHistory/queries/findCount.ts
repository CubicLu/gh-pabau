import { queryField, nonNull, list } from 'nexus'

export const ClassSmsHistoryFindCountQuery = queryField(
  'findManyClassSmsHistoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassSmsHistoryWhereInput',
      orderBy: list('ClassSmsHistoryOrderByInput'),
      cursor: 'ClassSmsHistoryWhereUniqueInput',
      distinct: 'ClassSmsHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classSmsHistory.count(args as any)
    },
  },
)
