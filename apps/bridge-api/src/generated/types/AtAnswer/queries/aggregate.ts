import { queryField, list } from 'nexus'

export const AtAnswerAggregateQuery = queryField('aggregateAtAnswer', {
  type: 'AggregateAtAnswer',
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByWithRelationInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.aggregate({ ...args, ...select }) as any
  },
})
