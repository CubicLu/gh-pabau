import { queryField, nonNull, list } from 'nexus'

export const SecondAtQuestionFindCountQuery = queryField(
  'findManySecondAtQuestionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      distinct: 'SecondAtQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtQuestion.count(args as any)
    },
  },
)
