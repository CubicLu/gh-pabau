import { queryField, list } from 'nexus'

export const UserSecurityQuestionsAnswerAggregateQuery = queryField(
  'aggregateUserSecurityQuestionsAnswer',
  {
    type: 'AggregateUserSecurityQuestionsAnswer',
    args: {
      where: 'UserSecurityQuestionsAnswerWhereInput',
      orderBy: list('UserSecurityQuestionsAnswerOrderByWithRelationInput'),
      cursor: 'UserSecurityQuestionsAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSecurityQuestionsAnswer.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
