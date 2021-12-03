import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackFindCountQuery = queryField(
  'findManySocialSurveyFeedbackCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyFeedbackScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedback.count(args as any)
    },
  },
)
