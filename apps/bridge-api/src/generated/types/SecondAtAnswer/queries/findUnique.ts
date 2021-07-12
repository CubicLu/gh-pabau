import { queryField, nonNull } from 'nexus'

export const SecondAtAnswerFindUniqueQuery = queryField(
  'findUniqueSecondAtAnswer',
  {
    type: 'SecondAtAnswer',
    args: {
      where: nonNull('SecondAtAnswerWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.secondAtAnswer.findUnique({
        where,
        ...select,
      })
    },
  },
)
