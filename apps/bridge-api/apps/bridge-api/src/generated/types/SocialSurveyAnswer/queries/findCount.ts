import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyAnswerFindCountQuery = queryField(
  'findManySocialSurveyAnswerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByWithRelationInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      distinct: 'SocialSurveyAnswerScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyAnswer.count(args as any)
    },
  },
)
