import { queryField, list } from 'nexus'

export const AtQuestionsRelationAggregateQuery = queryField(
  'aggregateAtQuestionsRelation',
  {
    type: 'AggregateAtQuestionsRelation',
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByWithRelationInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.aggregate({ ...args, ...select }) as any
    },
  },
)
