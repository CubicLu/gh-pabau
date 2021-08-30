import { queryField, nonNull } from 'nexus'

export const UserSecurityQuestionsAnswerFindUniqueQuery = queryField(
  'findUniqueUserSecurityQuestionsAnswer',
  {
    type: 'UserSecurityQuestionsAnswer',
    args: {
      where: nonNull('UserSecurityQuestionsAnswerWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.findUnique({
        where,
        ...select,
      })
    },
  },
)
