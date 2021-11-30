import { mutationField, nonNull } from 'nexus'

export const SocialSurveyUpdateOneMutation = mutationField(
  'updateOneSocialSurvey',
  {
    type: nonNull('SocialSurvey'),
    args: {
      data: nonNull('SocialSurveyUpdateInput'),
      where: nonNull('SocialSurveyWhereUniqueInput'),
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
