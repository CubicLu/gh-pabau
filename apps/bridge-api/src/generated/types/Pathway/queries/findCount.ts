import { queryField, nonNull, list } from 'nexus'

export const PathwayFindCountQuery = queryField('findManyPathwayCount', {
  type: nonNull('Int'),
  args: {
    where: 'PathwayWhereInput',
    orderBy: list('PathwayOrderByWithRelationInput'),
    cursor: 'PathwayWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PathwayScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pathway.count(args as any)
  },
})
