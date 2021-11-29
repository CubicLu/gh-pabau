import { queryField, nonNull, list } from 'nexus'

export const UserSecurityQuestionsAnswerFindCountQuery = queryField(
  'findManyUserSecurityQuestionsAnswerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByWithRelationInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserSecurityQuestionsAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSecurityQuestionsAnswer.count(args as any)
    },
  },
)
