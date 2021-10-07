import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationCreateOneMutation = mutationField(
  'createOneAtQuestionsRelation',
  {
    type: nonNull('AtQuestionsRelation'),
    args: {
      data: nonNull('AtQuestionsRelationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.atQuestionsRelation.create({
        data,
        ...select,
      })
    },
  },
)
