import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackResponseFindFirstQuery = queryField(
  'findFirstSocialSurveyFeedbackResponse',
  {
    type: 'SocialSurveyFeedbackResponse',
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
