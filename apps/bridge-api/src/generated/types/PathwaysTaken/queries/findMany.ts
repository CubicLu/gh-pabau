import { queryField, nonNull, list } from 'nexus'

export const PathwaysTakenFindManyQuery = queryField('findManyPathwaysTaken', {
  type: nonNull(list(nonNull('PathwaysTaken'))),
  args: {
    where: 'PathwaysTakenWhereInput',
    orderBy: list('PathwaysTakenOrderByWithRelationInput'),
    cursor: 'PathwaysTakenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PathwaysTakenScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathwaysTaken.findMany({
      ...args,
      ...select,
    })
  },
})
