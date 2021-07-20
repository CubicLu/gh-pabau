import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackDeleteOneMutation = mutationField(
  'deleteOneSocialSurveyFeedback',
  {
    type: 'SocialSurveyFeedback',
    args: {
      where: nonNull('SocialSurveyFeedbackWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.socialSurveyFeedback.delete({
        where,
        ...select,
      })
    },
  },
)
