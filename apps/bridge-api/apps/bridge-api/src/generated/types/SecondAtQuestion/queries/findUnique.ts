import { queryField, nonNull } from 'nexus'

export const SecondAtQuestionFindUniqueQuery = queryField(
  'findUniqueSecondAtQuestion',
  {
    type: 'SecondAtQuestion',
    args: {
      where: nonNull('SecondAtQuestionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.secondAtQuestion.findUnique({
        where,
        ...select,
      })
    },
  },
)
