import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionCreateOneMutation = mutationField(
  'createOneSocialSurveyQuestion',
  {
    type: nonNull('SocialSurveyQuestion'),
    args: {
      data: nonNull('SocialSurveyQuestionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.socialSurveyQuestion.create({
        data,
        ...select,
      })
    },
  },
)
