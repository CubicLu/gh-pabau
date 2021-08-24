import { queryField, list } from 'nexus'

export const AtQuestionsRelationFindFirstQuery = queryField(
  'findFirstAtQuestionsRelation',
  {
    type: 'AtQuestionsRelation',
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      distinct: 'AtQuestionsRelationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
