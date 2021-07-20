import { queryField, list } from 'nexus'

export const AtQuestionsRelationAggregateQuery = queryField(
  'aggregateAtQuestionsRelation',
  {
    type: 'AggregateAtQuestionsRelation',
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      distinct: 'AtQuestionsRelationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.aggregate({ ...args, ...select }) as any
    },
  },
)
