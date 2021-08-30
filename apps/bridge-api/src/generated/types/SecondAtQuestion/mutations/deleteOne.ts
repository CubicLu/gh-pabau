import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionDeleteOneMutation = mutationField(
  'deleteOneSecondAtQuestion',
  {
    type: 'SecondAtQuestion',
    args: {
      where: nonNull('SecondAtQuestionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.secondAtQuestion.delete({
        where,
        ...select,
      })
    },
  },
)
