import { queryField, list } from 'nexus'

export const SocialSurveyAggregateQuery = queryField('aggregateSocialSurvey', {
  type: 'AggregateSocialSurvey',
  args: {
    where: 'SocialSurveyWhereInput',
    orderBy: list('SocialSurveyOrderByWithRelationInput'),
    cursor: 'SocialSurveyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.socialSurvey.aggregate({ ...args, ...select }) as any
  },
})
