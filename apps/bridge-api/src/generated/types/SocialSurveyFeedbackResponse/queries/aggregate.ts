import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackResponseAggregateQuery = queryField(
  'aggregateSocialSurveyFeedbackResponse',
  {
    type: 'AggregateSocialSurveyFeedbackResponse',
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
