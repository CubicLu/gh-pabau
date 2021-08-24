import { mutationField, nonNull } from 'nexus'

export const SocialSurveyFeedbackResponseUpsertOneMutation = mutationField(
  'upsertOneSocialSurveyFeedbackResponse',
  {
    type: nonNull('SocialSurveyFeedbackResponse'),
    args: {
      where: nonNull('SocialSurveyFeedbackResponseWhereUniqueInput'),
      create: nonNull('SocialSurveyFeedbackResponseCreateInput'),
      update: nonNull('SocialSurveyFeedbackResponseUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.upsert({
        ...args,
        ...select,
      })
    },
  },
)
