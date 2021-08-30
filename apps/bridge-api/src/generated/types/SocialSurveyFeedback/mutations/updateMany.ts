import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackUpdateManyMutation = mutationField(
  'updateManySocialSurveyFeedback',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      data: nonNull('SocialSurveyFeedbackUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedback.updateMany(args as any)
    },
  },
)
