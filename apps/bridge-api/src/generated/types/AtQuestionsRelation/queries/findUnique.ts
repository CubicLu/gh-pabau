import { queryField, nonNull } from 'nexus'

export const AtQuestionsRelationFindUniqueQuery = queryField(
  'findUniqueAtQuestionsRelation',
  {
    type: 'AtQuestionsRelation',
    args: {
      where: nonNull('AtQuestionsRelationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.atQuestionsRelation.findUnique({
        where,
        ...select,
      })
    },
  },
)
