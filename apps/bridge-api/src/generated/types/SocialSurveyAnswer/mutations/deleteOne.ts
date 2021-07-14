import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerDeleteOneMutation = mutationField(
  'deleteOneSocialSurveyAnswer',
  {
    type: 'SocialSurveyAnswer',
    args: {
      where: nonNull('SocialSurveyAnswerWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.socialSurveyAnswer.delete({
        where,
        ...select,
      })
    },
  },
)
