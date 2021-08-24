import { queryField, list } from 'nexus'

export const AtAnswerAggregateQuery = queryField('aggregateAtAnswer', {
  type: 'AggregateAtAnswer',
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    distinct: 'AtAnswerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.aggregate({ ...args, ...select }) as any
  },
})
