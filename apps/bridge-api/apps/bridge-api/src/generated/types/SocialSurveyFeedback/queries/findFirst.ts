import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackFindFirstQuery = queryField(
  'findFirstSocialSurveyFeedback',
  {
    type: 'SocialSurveyFeedback',
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedback.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
