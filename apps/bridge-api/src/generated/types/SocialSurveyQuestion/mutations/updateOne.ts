import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionUpdateOneMutation = mutationField(
  'updateOneSocialSurveyQuestion',
  {
    type: nonNull('SocialSurveyQuestion'),
    args: {
      data: nonNull('SocialSurveyQuestionUpdateInput'),
      where: nonNull('SocialSurveyQuestionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.socialSurveyQuestion.update({
        where,
        data,
        ...select,
      })
    },
  },
)
