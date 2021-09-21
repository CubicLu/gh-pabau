import { queryField, list } from 'nexus'

export const SecondAtQuestionAggregateQuery = queryField(
  'aggregateSecondAtQuestion',
  {
    type: 'AggregateSecondAtQuestion',
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      distinct: 'SecondAtQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.aggregate({ ...args, ...select }) as any
    },
  },
)
