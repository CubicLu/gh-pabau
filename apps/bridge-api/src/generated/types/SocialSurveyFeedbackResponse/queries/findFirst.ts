import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackResponseFindFirstQuery = queryField(
  'findFirstSocialSurveyFeedbackResponse',
  {
    type: 'SocialSurveyFeedbackResponse',
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyFeedbackResponseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
