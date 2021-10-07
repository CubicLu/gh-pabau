import { queryField, nonNull, list } from 'nexus'

export const AppBeforeAfterFindCountQuery = queryField(
  'findManyAppBeforeAfterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByWithRelationInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      distinct: 'AppBeforeAfterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appBeforeAfter.count(args as any)
    },
  },
)
