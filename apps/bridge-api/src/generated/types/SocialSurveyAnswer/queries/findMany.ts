import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyAnswerFindManyQuery = queryField(
  'findManySocialSurveyAnswer',
  {
    type: nonNull(list(nonNull('SocialSurveyAnswer'))),
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      distinct: 'SocialSurveyAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.findMany({
        ...args,
        ...select,
      })
    },
  },
)
