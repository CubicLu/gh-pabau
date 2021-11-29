import { queryField, nonNull, list } from 'nexus'

export const AtConcernFindCountQuery = queryField('findManyAtConcernCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtConcernWhereInput',
    orderBy: list('AtConcernOrderByWithRelationInput'),
    cursor: 'AtConcernWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtConcernScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atConcern.count(args as any)
  },
})
