import { queryField, nonNull, list } from 'nexus'

export const AppBeforeAfterFindCountQuery = queryField(
  'findManyAppBeforeAfterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByWithRelationInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppBeforeAfterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.appBeforeAfter.count(args as any)
    },
  },
)
