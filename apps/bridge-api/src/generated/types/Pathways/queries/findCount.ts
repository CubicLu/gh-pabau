import { queryField, nonNull, list } from 'nexus'

export const PathwaysFindCountQuery = queryField('findManyPathwaysCount', {
  type: nonNull('Int'),
  args: {
    where: 'PathwaysWhereInput',
    orderBy: list('PathwaysOrderByWithRelationInput'),
    cursor: 'PathwaysWhereUniqueInput',
    distinct: 'PathwaysScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pathways.count(args as any)
  },
})
