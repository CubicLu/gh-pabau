import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseUpdateManyMutation = mutationField(
  'updateManySocialSurveyFeedbackResponse',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SocialSurveyFeedbackResponseUpdateManyMutationInput'),
      where: 'SocialSurveyFeedbackResponseWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedbackResponse.updateMany(args as any)
    },
  },
)
