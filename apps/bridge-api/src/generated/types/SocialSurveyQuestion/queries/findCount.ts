import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyQuestionFindCountQuery = queryField(
  'findManySocialSurveyQuestionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      orderBy: list('SocialSurveyQuestionOrderByWithRelationInput'),
      cursor: 'SocialSurveyQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyQuestionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyQuestion.count(args as any)
    },
  },
)
