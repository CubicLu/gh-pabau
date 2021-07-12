import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionDeleteOneMutation = mutationField(
  'deleteOneSocialSurveyQuestion',
  {
    type: 'SocialSurveyQuestion',
    args: {
      where: nonNull('SocialSurveyQuestionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.socialSurveyQuestion.delete({
        where,
        ...select,
      })
    },
  },
)
