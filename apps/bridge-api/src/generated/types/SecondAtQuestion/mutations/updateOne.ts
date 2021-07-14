import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionUpdateOneMutation = mutationField(
  'updateOneSecondAtQuestion',
  {
    type: nonNull('SecondAtQuestion'),
    args: {
      where: nonNull('SecondAtQuestionWhereUniqueInput'),
      data: nonNull('SecondAtQuestionUpdateInput'),
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
