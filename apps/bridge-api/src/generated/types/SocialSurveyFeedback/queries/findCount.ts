import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackFindCountQuery = queryField(
  'findManySocialSurveyFeedbackCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedback.count(args as any)
    },
  },
)
