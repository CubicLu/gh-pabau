import { queryField, nonNull, list } from 'nexus'

export const PathwayFindCountQuery = queryField('findManyPathwayCount', {
  type: nonNull('Int'),
  args: {
    where: 'PathwayWhereInput',
    orderBy: list('PathwayOrderByWithRelationInput'),
    cursor: 'PathwayWhereUniqueInput',
    distinct: 'PathwayScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pathway.count(args as any)
  },
})
