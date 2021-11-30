import { queryField, list } from 'nexus'

export const AtQuestionAggregateQuery = queryField('aggregateAtQuestion', {
  type: 'AggregateAtQuestion',
  args: {
    where: 'AtQuestionWhereInput',
    orderBy: list('AtQuestionOrderByWithRelationInput'),
    cursor: 'AtQuestionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuestion.aggregate({ ...args, ...select }) as any
  },
})
