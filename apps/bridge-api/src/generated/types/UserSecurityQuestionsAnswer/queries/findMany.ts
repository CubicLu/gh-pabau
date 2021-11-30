import { queryField, nonNull, list } from 'nexus'

export const UserSecurityQuestionsAnswerFindManyQuery = queryField(
  'findManyUserSecurityQuestionsAnswer',
  {
    type: nonNull(list(nonNull('UserSecurityQuestionsAnswer'))),
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByWithRelationInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('UserSecurityQuestionsAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.findMany({
        ...args,
        ...select,
      })
    },
  },
)
