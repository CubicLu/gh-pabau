import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerUpdateManyMutation = mutationField(
  'updateManySocialSurveyAnswer',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SocialSurveyAnswerWhereInput',
      data: nonNull('SocialSurveyAnswerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyAnswer.updateMany(args as any)
    },
  },
)
