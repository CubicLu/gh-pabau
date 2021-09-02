import { queryField, list } from 'nexus'

export const SecondAtAnswerFindFirstQuery = queryField(
  'findFirstSecondAtAnswer',
  {
    type: 'SecondAtAnswer',
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByWithRelationInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      distinct: 'SecondAtAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtAnswer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
