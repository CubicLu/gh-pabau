import { mutationField, nonNull } from 'nexus'

export const AtQuestionCreateOneMutation = mutationField(
  'createOneAtQuestion',
  {
    type: nonNull('AtQuestion'),
    args: {
      data: nonNull('AtQuestionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.atQuestion.create({
        data,
        ...select,
      })
    },
  },
)
