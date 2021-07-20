import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseUpdateOneMutation = mutationField(
  'updateOneSocialSurveyFeedbackResponse',
  {
    type: nonNull('SocialSurveyFeedbackResponse'),
    args: {
      where: nonNull('SocialSurveyFeedbackResponseWhereUniqueInput'),
      data: nonNull('SocialSurveyFeedbackResponseUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.update({
        where,
        data,
        ...select,
      })
    },
  },
)
