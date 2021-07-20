import { queryField, list } from 'nexus'

export const UserSecurityQuestionsAnswerAggregateQuery = queryField(
  'aggregateUserSecurityQuestionsAnswer',
  {
    type: 'AggregateUserSecurityQuestionsAnswer',
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      distinct: 'UserSecurityQuestionsAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
