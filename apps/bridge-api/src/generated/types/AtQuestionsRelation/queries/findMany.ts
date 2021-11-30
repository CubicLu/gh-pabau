import { queryField, nonNull, list } from 'nexus'

export const AtQuestionsRelationFindManyQuery = queryField(
  'findManyAtQuestionsRelation',
  {
    type: nonNull(list(nonNull('AtQuestionsRelation'))),
    args: {
      where: 'AtQuestionsRelationWhereInput',
      orderBy: list('AtQuestionsRelationOrderByWithRelationInput'),
      cursor: 'AtQuestionsRelationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AtQuestionsRelationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atQuestionsRelation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
