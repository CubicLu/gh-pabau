import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerUpdateOneMutation = mutationField(
  'updateOneSocialSurveyAnswer',
  {
    type: nonNull('SocialSurveyAnswer'),
    args: {
      data: nonNull('SocialSurveyAnswerUpdateInput'),
      where: nonNull('SocialSurveyAnswerWhereUniqueInput'),
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
