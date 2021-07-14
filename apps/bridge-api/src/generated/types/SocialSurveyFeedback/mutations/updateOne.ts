import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackUpdateOneMutation = mutationField(
  'updateOneSocialSurveyFeedback',
  {
    type: nonNull('SocialSurveyFeedback'),
    args: {
      where: nonNull('SocialSurveyFeedbackWhereUniqueInput'),
      data: nonNull('SocialSurveyFeedbackUpdateInput'),
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
