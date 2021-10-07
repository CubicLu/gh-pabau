import { queryField, list } from 'nexus'

export const SecondAtQuestionFindFirstQuery = queryField(
  'findFirstSecondAtQuestion',
  {
    type: 'SecondAtQuestion',
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      distinct: 'SecondAtQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
