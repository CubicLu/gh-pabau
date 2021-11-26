import { queryField, nonNull, list } from 'nexus'

export const AtQuestionsRelationFindCountQuery = queryField(
  'findManyAtQuestionsRelationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByWithRelationInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AtQuestionsRelationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atQuestionsRelation.count(args as any)
    },
  },
)
