import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFindCountQuery = queryField(
  'findManySocialSurveyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyWhereInput',
      orderBy: list('SocialSurveyOrderByInput'),
      cursor: 'SocialSurveyWhereUniqueInput',
      distinct: 'SocialSurveyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurvey.count(args as any)
    },
  },
)
