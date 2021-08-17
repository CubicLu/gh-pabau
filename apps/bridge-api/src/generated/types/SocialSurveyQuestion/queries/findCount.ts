import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyQuestionFindCountQuery = queryField(
  'findManySocialSurveyQuestionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      orderBy: list('SocialSurveyQuestionOrderByInput'),
      cursor: 'SocialSurveyQuestionWhereUniqueInput',
      distinct: 'SocialSurveyQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyQuestion.count(args as any)
    },
  },
)
