import { queryField, list } from 'nexus'

export const SecondAtQuestionFindFirstQuery = queryField(
  'findFirstSecondAtQuestion',
  {
    type: 'SecondAtQuestion',
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SecondAtQuestionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
