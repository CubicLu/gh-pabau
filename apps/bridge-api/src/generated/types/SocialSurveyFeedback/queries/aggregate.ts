import { queryField, list } from 'nexus'

export const SocialSurveyFeedbackAggregateQuery = queryField(
  'aggregateSocialSurveyFeedback',
  {
    type: 'AggregateSocialSurveyFeedback',
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedback.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
