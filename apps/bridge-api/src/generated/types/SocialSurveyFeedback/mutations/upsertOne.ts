import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackUpsertOneMutation = mutationField(
  'upsertOneSocialSurveyFeedback',
  {
    type: nonNull('SocialSurveyFeedback'),
    args: {
      where: nonNull('SocialSurveyFeedbackWhereUniqueInput'),
      create: nonNull('SocialSurveyFeedbackCreateInput'),
      update: nonNull('SocialSurveyFeedbackUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedback.upsert({
        ...args,
        ...select,
      })
    },
  },
)
