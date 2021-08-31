import { queryField, nonNull, list } from 'nexus'

export const AtConcernFindCountQuery = queryField('findManyAtConcernCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtConcernWhereInput',
    orderBy: list('AtConcernOrderByWithRelationInput'),
    cursor: 'AtConcernWhereUniqueInput',
    distinct: 'AtConcernScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atConcern.count(args as any)
  },
})
