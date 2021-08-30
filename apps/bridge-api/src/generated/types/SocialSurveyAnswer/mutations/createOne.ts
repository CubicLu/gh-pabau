import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerCreateOneMutation = mutationField(
  'createOneSocialSurveyAnswer',
  {
    type: nonNull('SocialSurveyAnswer'),
    args: {
      data: nonNull('SocialSurveyAnswerCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.socialSurveyAnswer.create({
        data,
        ...select,
      })
    },
  },
)
