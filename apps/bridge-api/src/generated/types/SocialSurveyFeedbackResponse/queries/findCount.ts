import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackResponseFindCountQuery = queryField(
  'findManySocialSurveyFeedbackResponseCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyFeedbackResponseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedbackResponse.count(args as any)
    },
  },
)
