import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionUpdateOneMutation = mutationField(
  'updateOneSecondAtQuestion',
  {
    type: nonNull('SecondAtQuestion'),
    args: {
      data: nonNull('SecondAtQuestionUpdateInput'),
      where: nonNull('SecondAtQuestionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.secondAtQuestion.update({
        where,
        data,
        ...select,
      })
    },
  },
)
