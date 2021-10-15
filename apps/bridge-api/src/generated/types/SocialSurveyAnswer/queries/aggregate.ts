import { queryField, list } from 'nexus'

export const SocialSurveyAnswerAggregateQuery = queryField(
  'aggregateSocialSurveyAnswer',
  {
    type: 'AggregateSocialSurveyAnswer',
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      distinct: 'SocialSurveyAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.aggregate({ ...args, ...select }) as any
    },
  },
)
