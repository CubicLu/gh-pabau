import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionUpdateManyMutation = mutationField(
  'updateManySocialSurveyQuestion',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      data: nonNull('SocialSurveyQuestionUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyQuestion.updateMany(args as any)
    },
  },
)
