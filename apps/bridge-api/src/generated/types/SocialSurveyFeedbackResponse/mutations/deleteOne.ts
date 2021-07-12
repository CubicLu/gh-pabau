import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseDeleteOneMutation = mutationField(
  'deleteOneSocialSurveyFeedbackResponse',
  {
    type: 'SocialSurveyFeedbackResponse',
    args: {
      where: nonNull('SocialSurveyFeedbackResponseWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.socialSurveyFeedbackResponse.delete({
        where,
        ...select,
      })
    },
  },
)
