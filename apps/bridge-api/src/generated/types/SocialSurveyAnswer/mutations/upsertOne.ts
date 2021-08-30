import { mutationField, nonNull } from 'nexus'

export const SocialSurveyAnswerUpsertOneMutation = mutationField(
  'upsertOneSocialSurveyAnswer',
  {
    type: nonNull('SocialSurveyAnswer'),
    args: {
      where: nonNull('SocialSurveyAnswerWhereUniqueInput'),
      create: nonNull('SocialSurveyAnswerCreateInput'),
      update: nonNull('SocialSurveyAnswerUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyAnswer.upsert({
        ...args,
        ...select,
      })
    },
  },
)
