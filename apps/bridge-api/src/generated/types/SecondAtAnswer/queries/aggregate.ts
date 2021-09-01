import { queryField, list } from 'nexus'

export const SecondAtAnswerAggregateQuery = queryField(
  'aggregateSecondAtAnswer',
  {
    type: 'AggregateSecondAtAnswer',
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByWithRelationInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      distinct: 'SecondAtAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtAnswer.aggregate({ ...args, ...select }) as any
    },
  },
)
