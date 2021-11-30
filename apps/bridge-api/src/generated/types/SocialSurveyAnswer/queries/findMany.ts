import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyAnswerFindManyQuery = queryField(
  'findManySocialSurveyAnswer',
  {
    type: nonNull(list(nonNull('SocialSurveyAnswer'))),
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      orderBy: list('SocialSurveyAnswerOrderByWithRelationInput'),
      cursor: 'SocialSurveyAnswerWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyAnswerScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.findMany({
        ...args,
        ...select,
      })
    },
  },
)
