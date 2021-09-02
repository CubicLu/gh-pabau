import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackResponseAggregateQuery = queryField(
  'aggregateSocialSurveyFeedbackResponse',
  {
    type: 'AggregateSocialSurveyFeedbackResponse',
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
