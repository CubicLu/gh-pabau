import { queryField, list } from 'nexus'

export const UserSecurityQuestionsAnswerFindFirstQuery = queryField(
  'findFirstUserSecurityQuestionsAnswer',
  {
    type: 'UserSecurityQuestionsAnswer',
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      distinct: 'UserSecurityQuestionsAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
