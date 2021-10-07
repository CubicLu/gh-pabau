import { mutationField, nonNull } from 'nexus'

export const AtQuestionUpdateOneMutation = mutationField(
  'updateOneAtQuestion',
  {
    type: nonNull('AtQuestion'),
    args: {
      where: nonNull('AtQuestionWhereUniqueInput'),
      data: nonNull('AtQuestionUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.atQuestion.update({
        where,
        data,
        ...select,
      })
    },
  },
)
