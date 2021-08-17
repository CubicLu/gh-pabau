import { queryField, nonNull, list } from 'nexus'

export const SecondAtAnswerFindManyQuery = queryField(
  'findManySecondAtAnswer',
  {
    type: nonNull(list(nonNull('SecondAtAnswer'))),
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      distinct: 'SecondAtAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtAnswer.findMany({
        ...args,
        ...select,
      })
    },
  },
)
