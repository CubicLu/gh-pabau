import { queryField, nonNull, list } from 'nexus'

export const AtAnswerFindManyQuery = queryField('findManyAtAnswer', {
  type: nonNull(list(nonNull('AtAnswer'))),
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByWithRelationInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    distinct: 'AtAnswerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.findMany({
      ...args,
      ...select,
    })
  },
})
