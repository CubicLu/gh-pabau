import { queryField, list } from 'nexus'

export const SocialSurveyFindFirstQuery = queryField('findFirstSocialSurvey', {
  type: 'SocialSurvey',
  args: {
    where: 'SocialSurveyWhereInput',
    orderBy: list('SocialSurveyOrderByWithRelationInput'),
    cursor: 'SocialSurveyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SocialSurveyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.socialSurvey.findFirst({
      ...args,
      ...select,
    })
  },
})
