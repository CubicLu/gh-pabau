import { mutationField, nonNull } from 'nexus'

export const AtQuestionDeleteOneMutation = mutationField(
  'deleteOneAtQuestion',
  {
    type: 'AtQuestion',
    args: {
      where: nonNull('AtQuestionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.atQuestion.delete({
        where,
        ...select,
      })
    },
  },
)
