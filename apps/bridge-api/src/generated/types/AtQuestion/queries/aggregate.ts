import { queryField, list } from 'nexus'

export const AtQuestionAggregateQuery = queryField('aggregateAtQuestion', {
  type: 'AggregateAtQuestion',
  args: {
    where: 'AtQuestionWhereInput',
    orderBy: list('AtQuestionOrderByInput'),
    cursor: 'AtQuestionWhereUniqueInput',
    distinct: 'AtQuestionScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuestion.aggregate({ ...args, ...select }) as any
  },
})
