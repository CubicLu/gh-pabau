import { mutationField, nonNull } from 'nexus'

export const SocialSurveyUpdateManyMutation = mutationField(
  'updateManySocialSurvey',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SocialSurveyUpdateManyMutationInput'),
      where: 'SocialSurveyWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurvey.updateMany(args as any)
    },
  },
)
