import { queryField, list } from 'nexus'

export const SocialSurveyQuestionFindFirstQuery = queryField(
  'findFirstSocialSurveyQuestion',
  {
    type: 'SocialSurveyQuestion',
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      orderBy: list('SocialSurveyQuestionOrderByWithRelationInput'),
      cursor: 'SocialSurveyQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyQuestionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyQuestion.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
