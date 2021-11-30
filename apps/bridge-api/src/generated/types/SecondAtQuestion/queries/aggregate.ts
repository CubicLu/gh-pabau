import { queryField, list } from 'nexus'

export const SecondAtQuestionAggregateQuery = queryField(
  'aggregateSecondAtQuestion',
  {
    type: 'AggregateSecondAtQuestion',
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.aggregate({ ...args, ...select }) as any
    },
  },
)
