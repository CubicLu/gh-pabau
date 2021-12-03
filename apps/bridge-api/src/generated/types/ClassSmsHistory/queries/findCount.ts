import { queryField, nonNull, list } from 'nexus'

export const ClassSmsHistoryFindCountQuery = queryField(
  'findManyClassSmsHistoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassSmsHistoryWhereInput',
      orderBy: list('ClassSmsHistoryOrderByWithRelationInput'),
      cursor: 'ClassSmsHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassSmsHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classSmsHistory.count(args as any)
    },
  },
)
