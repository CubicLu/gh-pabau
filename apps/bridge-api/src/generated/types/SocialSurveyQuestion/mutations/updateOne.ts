import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionUpdateOneMutation = mutationField(
  'updateOneSocialSurveyQuestion',
  {
    type: nonNull('SocialSurveyQuestion'),
    args: {
      where: nonNull('SocialSurveyQuestionWhereUniqueInput'),
      data: nonNull('SocialSurveyQuestionUpdateInput'),
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
