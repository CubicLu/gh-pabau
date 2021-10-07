import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerUpdateOneMutation = mutationField(
  'updateOneSocialSurveyAnswer',
  {
    type: nonNull('SocialSurveyAnswer'),
    args: {
      where: nonNull('SocialSurveyAnswerWhereUniqueInput'),
      data: nonNull('SocialSurveyAnswerUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.socialSurveyAnswer.update({
        where,
        data,
        ...select,
      })
    },
  },
)
