import { queryField, nonNull, list } from 'nexus'

export const AtQuestionsRelationFindCountQuery = queryField(
  'findManyAtQuestionsRelationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      distinct: 'AtQuestionsRelationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuestionsRelation.count(args as any)
    },
  },
)
