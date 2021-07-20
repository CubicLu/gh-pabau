import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseUpdateManyMutation = mutationField(
  'updateManySocialSurveyFeedbackResponse',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      data: nonNull('SocialSurveyFeedbackResponseUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyFeedbackResponse.updateMany(args as any)
    },
  },
)
