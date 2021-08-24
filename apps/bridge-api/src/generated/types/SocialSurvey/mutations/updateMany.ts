import { mutationField, nonNull } from 'nexus'

export const SocialSurveyUpdateManyMutation = mutationField(
  'updateManySocialSurvey',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SocialSurveyWhereInput',
      data: nonNull('SocialSurveyUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.socialSurvey.updateMany(args as any)
    },
  },
)
