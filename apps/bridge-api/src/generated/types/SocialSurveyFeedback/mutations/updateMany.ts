import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackUpdateManyMutation = mutationField(
  'updateManySocialSurveyFeedback',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SocialSurveyFeedbackUpdateManyMutationInput'),
      where: 'SocialSurveyFeedbackWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedback.updateMany(args as any)
    },
  },
)
