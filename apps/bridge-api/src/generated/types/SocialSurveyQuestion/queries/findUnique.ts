import { queryField, nonNull } from 'nexus'

export const SocialSurveyQuestionFindUniqueQuery = queryField(
  'findUniqueSocialSurveyQuestion',
  {
    type: 'SocialSurveyQuestion',
    args: {
      where: nonNull('SocialSurveyQuestionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.socialSurveyQuestion.findUnique({
        where,
        ...select,
      })
    },
  },
)
