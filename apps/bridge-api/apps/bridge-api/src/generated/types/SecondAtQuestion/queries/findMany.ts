import { queryField, nonNull, list } from 'nexus'

export const SecondAtQuestionFindManyQuery = queryField(
  'findManySecondAtQuestion',
  {
    type: nonNull(list(nonNull('SecondAtQuestion'))),
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      distinct: 'SecondAtQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.findMany({
        ...args,
        ...select,
      })
    },
  },
)
