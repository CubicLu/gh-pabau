import { queryField, nonNull, list } from 'nexus'

export const AtAnswerFindManyQuery = queryField('findManyAtAnswer', {
  type: nonNull(list(nonNull('AtAnswer'))),
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByWithRelationInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtAnswerScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.findMany({
      ...args,
      ...select,
    })
  },
})
