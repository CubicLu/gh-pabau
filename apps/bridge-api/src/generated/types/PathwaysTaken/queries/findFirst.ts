import { queryField, list } from 'nexus'

export const PathwaysTakenFindFirstQuery = queryField(
  'findFirstPathwaysTaken',
  {
    type: 'PathwaysTaken',
    args: {
      where: 'PathwaysTakenWhereInput',
      orderBy: list('PathwaysTakenOrderByWithRelationInput'),
      cursor: 'PathwaysTakenWhereUniqueInput',
      distinct: 'PathwaysTakenScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pathwaysTaken.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
