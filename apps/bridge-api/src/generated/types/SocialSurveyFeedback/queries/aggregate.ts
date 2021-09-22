import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackAggregateQuery = queryField(
  'aggregateSocialSurveyFeedback',
  {
    type: 'AggregateSocialSurveyFeedback',
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedback.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
