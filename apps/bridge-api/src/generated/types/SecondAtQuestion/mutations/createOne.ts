import { mutationField, nonNull } from 'nexus'

export const SecondAtQuestionCreateOneMutation = mutationField(
  'createOneSecondAtQuestion',
  {
    type: nonNull('SecondAtQuestion'),
    args: {
      data: nonNull('SecondAtQuestionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.secondAtQuestion.create({
        data,
        ...select,
      })
    },
  },
)
