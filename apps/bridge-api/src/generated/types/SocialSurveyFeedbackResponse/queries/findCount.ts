import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackResponseFindCountQuery = queryField(
  'findManySocialSurveyFeedbackResponseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedbackResponse.count(args as any)
    },
  },
)
