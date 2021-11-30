import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionUpdateManyMutation = mutationField(
  'updateManySocialSurveyQuestion',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SocialSurveyQuestionUpdateManyMutationInput'),
      where: 'SocialSurveyQuestionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyQuestion.updateMany(args as any)
    },
  },
)
