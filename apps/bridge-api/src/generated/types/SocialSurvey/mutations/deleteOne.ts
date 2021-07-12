import { mutationField, nonNull } from 'nexus'

export const SocialSurveyDeleteOneMutation = mutationField(
  'deleteOneSocialSurvey',
  {
    type: 'SocialSurvey',
    args: {
      where: nonNull('SocialSurveyWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.socialSurvey.delete({
        where,
        ...select,
      })
    },
  },
)
