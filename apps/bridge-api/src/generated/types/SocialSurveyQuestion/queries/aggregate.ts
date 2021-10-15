import { queryField, list } from 'nexus'

export const SocialSurveyQuestionAggregateQuery = queryField(
  'aggregateSocialSurveyQuestion',
  {
    type: 'AggregateSocialSurveyQuestion',
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      orderBy: list('SocialSurveyQuestionOrderByInput'),
      cursor: 'SocialSurveyQuestionWhereUniqueInput',
      distinct: 'SocialSurveyQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyQuestion.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
