import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFindCountQuery = queryField(
  'findManySocialSurveyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyWhereInput',
      orderBy: list('SocialSurveyOrderByWithRelationInput'),
      cursor: 'SocialSurveyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurvey.count(args as any)
    },
  },
)
