import { queryField, list } from 'nexus'

export const SocialSurveyAnswerAggregateQuery = queryField(
  'aggregateSocialSurveyAnswer',
  {
    type: 'AggregateSocialSurveyAnswer',
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByWithRelationInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.aggregate({ ...args, ...select }) as any
    },
  },
)
