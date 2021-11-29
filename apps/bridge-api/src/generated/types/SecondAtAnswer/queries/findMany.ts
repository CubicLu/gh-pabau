import { queryField, nonNull, list } from 'nexus'

export const SecondAtAnswerFindManyQuery = queryField(
  'findManySecondAtAnswer',
  {
    type: nonNull(list(nonNull('SecondAtAnswer'))),
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByWithRelationInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SecondAtAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtAnswer.findMany({
        ...args,
        ...select,
      })
    },
  },
)
