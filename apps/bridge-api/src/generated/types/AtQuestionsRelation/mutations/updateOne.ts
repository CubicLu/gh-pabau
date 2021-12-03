import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationUpdateOneMutation = mutationField(
  'updateOneAtQuestionsRelation',
  {
    type: nonNull('AtQuestionsRelation'),
    args: {
      data: nonNull('AtQuestionsRelationUpdateInput'),
      where: nonNull('AtQuestionsRelationWhereUniqueInput'),
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
