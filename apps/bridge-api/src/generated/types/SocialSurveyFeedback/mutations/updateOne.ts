import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackUpdateOneMutation = mutationField(
  'updateOneSocialSurveyFeedback',
  {
    type: nonNull('SocialSurveyFeedback'),
    args: {
      data: nonNull('SocialSurveyFeedbackUpdateInput'),
      where: nonNull('SocialSurveyFeedbackWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.socialSurveyFeedback.update({
        where,
        data,
        ...select,
      })
    },
  },
)
