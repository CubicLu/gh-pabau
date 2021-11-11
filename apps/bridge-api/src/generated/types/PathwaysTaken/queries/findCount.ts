import { queryField, nonNull, list } from 'nexus'

export const PathwaysTakenFindCountQuery = queryField(
  'findManyPathwaysTakenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwaysTakenWhereInput',
      orderBy: list('PathwaysTakenOrderByWithRelationInput'),
      cursor: 'PathwaysTakenWhereUniqueInput',
      distinct: 'PathwaysTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwaysTaken.count(args as any)
    },
  },
)
