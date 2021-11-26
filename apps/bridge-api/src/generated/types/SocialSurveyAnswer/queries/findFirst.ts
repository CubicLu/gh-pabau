import { queryField, list } from 'nexus'

export const SocialSurveyAnswerFindFirstQuery = queryField(
  'findFirstSocialSurveyAnswer',
  {
    type: 'SocialSurveyAnswer',
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByWithRelationInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
