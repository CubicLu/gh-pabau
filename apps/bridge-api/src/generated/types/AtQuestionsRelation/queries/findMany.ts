import { queryField, nonNull, list } from 'nexus'

export const AtQuestionsRelationFindManyQuery = queryField(
  'findManyAtQuestionsRelation',
  {
    type: nonNull(list(nonNull('AtQuestionsRelation'))),
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      distinct: 'AtQuestionsRelationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
