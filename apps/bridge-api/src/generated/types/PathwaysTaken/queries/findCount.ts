import { queryField, nonNull, list } from 'nexus'

export const PathwaysTakenFindCountQuery = queryField(
  'findManyPathwaysTakenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PathwaysTakenWhereInput',
      orderBy: list('PathwaysTakenOrderByWithRelationInput'),
      cursor: 'PathwaysTakenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PathwaysTakenScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pathwaysTaken.count(args as any)
    },
  },
)
