import { queryField, nonNull, list } from 'nexus'

export const SecondAtAnswerFindCountQuery = queryField(
  'findManySecondAtAnswerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByWithRelationInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SecondAtAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.secondAtAnswer.count(args as any)
    },
  },
)
