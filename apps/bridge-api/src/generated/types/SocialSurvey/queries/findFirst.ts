import { queryField, list } from 'nexus'

export const SocialSurveyFindFirstQuery = queryField('findFirstSocialSurvey', {
  type: 'SocialSurvey',
  args: {
    where: 'SocialSurveyWhereInput',
    orderBy: list('SocialSurveyOrderByInput'),
    cursor: 'SocialSurveyWhereUniqueInput',
    distinct: 'SocialSurveyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.socialSurvey.findFirst({
      ...args,
      ...select,
    })
  },
})
