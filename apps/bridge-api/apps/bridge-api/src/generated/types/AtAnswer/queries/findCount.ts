import { queryField, nonNull, list } from 'nexus'

export const AtAnswerFindCountQuery = queryField('findManyAtAnswerCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByWithRelationInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    distinct: 'AtAnswerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atAnswer.count(args as any)
  },
})
