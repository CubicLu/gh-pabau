import { queryField, nonNull, list } from 'nexus'

export const PathwaysFindManyQuery = queryField('findManyPathways', {
  type: nonNull(list(nonNull('Pathways'))),
  args: {
    where: 'PathwaysWhereInput',
    orderBy: list('PathwaysOrderByWithRelationInput'),
    cursor: 'PathwaysWhereUniqueInput',
    distinct: 'PathwaysScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pathways.findMany({
      ...args,
      ...select,
    })
  },
})
