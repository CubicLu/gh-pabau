import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseCreateOneMutation = mutationField(
  'createOneSocialSurveyFeedbackResponse',
  {
    type: nonNull('SocialSurveyFeedbackResponse'),
    args: {
      data: nonNull('SocialSurveyFeedbackResponseCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.create({
        data,
        ...select,
      })
    },
  },
)
