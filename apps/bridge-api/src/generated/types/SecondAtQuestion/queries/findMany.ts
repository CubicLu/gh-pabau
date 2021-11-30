import { queryField, nonNull, list } from 'nexus'

export const SecondAtQuestionFindManyQuery = queryField(
  'findManySecondAtQuestion',
  {
    type: nonNull(list(nonNull('SecondAtQuestion'))),
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SecondAtQuestionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtQuestion.findMany({
        ...args,
        ...select,
      })
    },
  },
)
