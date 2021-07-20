import { queryField, list } from 'nexus'

export const SocialSurveyAnswerFindFirstQuery = queryField(
  'findFirstSocialSurveyAnswer',
  {
    type: 'SocialSurveyAnswer',
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      distinct: 'SocialSurveyAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
