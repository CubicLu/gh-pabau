import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackCreateOneMutation = mutationField(
  'createOneSocialSurveyFeedback',
  {
    type: nonNull('SocialSurveyFeedback'),
    args: {
      data: nonNull('SocialSurveyFeedbackCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.socialSurveyFeedback.create({
        data,
        ...select,
      })
    },
  },
)
