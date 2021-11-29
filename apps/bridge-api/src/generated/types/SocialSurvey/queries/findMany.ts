import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFindManyQuery = queryField('findManySocialSurvey', {
  type: nonNull(list(nonNull('SocialSurvey'))),
  args: {
    where: 'SocialSurveyWhereInput',
    orderBy: list('SocialSurveyOrderByWithRelationInput'),
    cursor: 'SocialSurveyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SocialSurveyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.socialSurvey.findMany({
      ...args,
      ...select,
    })
  },
})
