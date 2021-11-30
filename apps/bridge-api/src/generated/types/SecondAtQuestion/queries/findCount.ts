import { queryField, nonNull, list } from 'nexus'

export const SecondAtQuestionFindCountQuery = queryField(
  'findManySecondAtQuestionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SecondAtQuestionWhereInput',
      orderBy: list('SecondAtQuestionOrderByWithRelationInput'),
      cursor: 'SecondAtQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SecondAtQuestionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtQuestion.count(args as any)
    },
  },
)
