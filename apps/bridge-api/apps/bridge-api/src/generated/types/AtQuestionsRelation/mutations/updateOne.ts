import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationUpdateOneMutation = mutationField(
  'updateOneAtQuestionsRelation',
  {
    type: nonNull('AtQuestionsRelation'),
    args: {
      where: nonNull('AtQuestionsRelationWhereUniqueInput'),
      data: nonNull('AtQuestionsRelationUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.atQuestionsRelation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
