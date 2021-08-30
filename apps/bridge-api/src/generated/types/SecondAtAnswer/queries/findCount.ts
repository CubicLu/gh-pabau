import { queryField, nonNull, list } from 'nexus'

export const SecondAtAnswerFindCountQuery = queryField(
  'findManySecondAtAnswerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByWithRelationInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      distinct: 'SecondAtAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtAnswer.count(args as any)
    },
  },
)
