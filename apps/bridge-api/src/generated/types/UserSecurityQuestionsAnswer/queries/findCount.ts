import { queryField, nonNull, list } from 'nexus'

export const UserSecurityQuestionsAnswerFindCountQuery = queryField(
  'findManyUserSecurityQuestionsAnswerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      distinct: 'UserSecurityQuestionsAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSecurityQuestionsAnswer.count(args as any)
    },
  },
)
