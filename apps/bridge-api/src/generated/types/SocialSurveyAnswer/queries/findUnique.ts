import { queryField, nonNull } from 'nexus'

export const SocialSurveyAnswerFindUniqueQuery = queryField(
  'findUniqueSocialSurveyAnswer',
  {
    type: 'SocialSurveyAnswer',
    args: {
      where: nonNull('SocialSurveyAnswerWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.socialSurveyAnswer.findUnique({
        where,
        ...select,
      })
    },
  },
)
