import { queryField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseFindUniqueQuery = queryField(
  'findUniqueSocialSurveyFeedbackResponse',
  {
    type: 'SocialSurveyFeedbackResponse',
    args: {
      where: nonNull('SocialSurveyFeedbackResponseWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.findUnique({
        where,
        ...select,
      })
    },
  },
)
