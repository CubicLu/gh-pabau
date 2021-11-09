import { queryField, nonNull, list } from 'nexus'

export const RecallFindCountQuery = queryField('findManyRecallCount', {
  type: nonNull('Int'),
  args: {
    where: 'RecallWhereInput',
    orderBy: list('RecallOrderByWithRelationInput'),
    cursor: 'RecallWhereUniqueInput',
    distinct: 'RecallScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.recall.count(args as any)
  },
})
