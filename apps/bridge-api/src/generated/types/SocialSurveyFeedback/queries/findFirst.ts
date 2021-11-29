import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackFindFirstQuery = queryField(
  'findFirstSocialSurveyFeedback',
  {
    type: 'SocialSurveyFeedback',
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyFeedbackScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedback.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
