import { queryField, list } from 'nexus'

export const SocialSurveyAggregateQuery = queryField('aggregateSocialSurvey', {
  type: 'AggregateSocialSurvey',
  args: {
    where: 'SocialSurveyWhereInput',
    orderBy: list('SocialSurveyOrderByWithRelationInput'),
    cursor: 'SocialSurveyWhereUniqueInput',
    distinct: 'SocialSurveyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.socialSurvey.aggregate({ ...args, ...select }) as any
  },
})
