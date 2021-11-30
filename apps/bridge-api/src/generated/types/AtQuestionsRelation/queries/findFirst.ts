import { queryField, list } from 'nexus'

export const AtQuestionsRelationFindFirstQuery = queryField(
  'findFirstAtQuestionsRelation',
  {
    type: 'AtQuestionsRelation',
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByWithRelationInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AtQuestionsRelationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
