import { queryField, nonNull, list } from 'nexus'

export const AtAnswerFindCountQuery = queryField('findManyAtAnswerCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByWithRelationInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtAnswerScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atAnswer.count(args as any)
  },
})
