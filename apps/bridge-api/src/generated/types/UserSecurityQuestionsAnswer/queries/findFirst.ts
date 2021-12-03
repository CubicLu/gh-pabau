import { queryField, list } from 'nexus'

export const UserSecurityQuestionsAnswerFindFirstQuery = queryField(
  'findFirstUserSecurityQuestionsAnswer',
  {
    type: 'UserSecurityQuestionsAnswer',
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByWithRelationInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserSecurityQuestionsAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
