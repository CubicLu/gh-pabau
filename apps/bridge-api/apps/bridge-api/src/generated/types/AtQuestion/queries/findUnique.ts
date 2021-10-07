import { queryField, nonNull } from 'nexus'

export const AtQuestionFindUniqueQuery = queryField('findUniqueAtQuestion', {
  type: 'AtQuestion',
  args: {
    where: nonNull('AtQuestionWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.atQuestion.findUnique({
      where,
      ...select,
    })
  },
})
