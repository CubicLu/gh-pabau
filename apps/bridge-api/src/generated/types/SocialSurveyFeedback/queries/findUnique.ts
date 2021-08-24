import { queryField, nonNull } from 'nexus'

export const SocialSurveyFeedbackFindUniqueQuery = queryField(
  'findUniqueSocialSurveyFeedback',
  {
    type: 'SocialSurveyFeedback',
    args: {
      where: nonNull('SocialSurveyFeedbackWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.socialSurveyFeedback.findUnique({
        where,
        ...select,
      })
    },
  },
)
