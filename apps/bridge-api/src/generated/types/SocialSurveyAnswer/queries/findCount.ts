import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyAnswerFindCountQuery = queryField(
  'findManySocialSurveyAnswerCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByWithRelationInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyAnswer.count(args as any)
    },
  },
)
