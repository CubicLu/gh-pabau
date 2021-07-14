import { mutationField, nonNull } from 'nexus'

export const AtQuestionsRelationDeleteOneMutation = mutationField(
  'deleteOneAtQuestionsRelation',
  {
    type: 'AtQuestionsRelation',
    args: {
      where: nonNull('AtQuestionsRelationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.atQuestionsRelation.delete({
        where,
        ...select,
      })
    },
  },
)
