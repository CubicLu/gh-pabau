import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseUpdateOneMutation = mutationField(
  'updateOneSocialSurveyFeedbackResponse',
  {
    type: nonNull('SocialSurveyFeedbackResponse'),
    args: {
      data: nonNull('SocialSurveyFeedbackResponseUpdateInput'),
      where: nonNull('SocialSurveyFeedbackResponseWhereUniqueInput'),
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
