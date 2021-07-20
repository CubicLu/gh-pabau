import { mutationField, nonNull } from 'nexus'

export const SocialSurveyCreateOneMutation = mutationField(
  'createOneSocialSurvey',
  {
    type: nonNull('SocialSurvey'),
    args: {
      data: nonNull('SocialSurveyCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.socialSurvey.create({
        data,
        ...select,
      })
    },
  },
)
