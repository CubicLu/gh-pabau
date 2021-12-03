import { queryField, list } from 'nexus'

export const SecondAtAnswerFindFirstQuery = queryField(
  'findFirstSecondAtAnswer',
  {
    type: 'SecondAtAnswer',
    args: {
      where: 'SecondAtAnswerWhereInput',
      orderBy: list('SecondAtAnswerOrderByWithRelationInput'),
      cursor: 'SecondAtAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SecondAtAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.secondAtAnswer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
