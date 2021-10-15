import { queryField, nonNull, list } from 'nexus'

export const UserSecurityQuestionsAnswerFindManyQuery = queryField(
  'findManyUserSecurityQuestionsAnswer',
  {
    type: nonNull(list(nonNull('UserSecurityQuestionsAnswer'))),
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      distinct: 'UserSecurityQuestionsAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.findMany({
        ...args,
        ...select,
      })
    },
  },
)
