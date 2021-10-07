import { mutationField, nonNull } from 'nexus'

export const SocialSurveyUpdateOneMutation = mutationField(
  'updateOneSocialSurvey',
  {
    type: nonNull('SocialSurvey'),
    args: {
      where: nonNull('SocialSurveyWhereUniqueInput'),
      data: nonNull('SocialSurveyUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.socialSurvey.update({
        where,
        data,
        ...select,
      })
    },
  },
)
