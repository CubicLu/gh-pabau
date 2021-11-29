import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerUpdateManyMutation = mutationField(
  'updateManySocialSurveyAnswer',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SocialSurveyAnswerUpdateManyMutationInput'),
      where: 'SocialSurveyAnswerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurveyAnswer.updateMany(args as any)
    },
  },
)
