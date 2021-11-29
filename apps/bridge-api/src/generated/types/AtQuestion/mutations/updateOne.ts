import { mutationField, nonNull } from 'nexus'

export const AtQuestionUpdateOneMutation = mutationField(
  'updateOneAtQuestion',
  {
    type: nonNull('AtQuestion'),
    args: {
      data: nonNull('AtQuestionUpdateInput'),
      where: nonNull('AtQuestionWhereUniqueInput'),
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
