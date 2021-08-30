import { mutationField, nonNull } from 'nexus'

export const SocialSurveyQuestionUpsertOneMutation = mutationField(
  'upsertOneSocialSurveyQuestion',
  {
    type: nonNull('SocialSurveyQuestion'),
    args: {
      where: nonNull('SocialSurveyQuestionWhereUniqueInput'),
      create: nonNull('SocialSurveyQuestionCreateInput'),
      update: nonNull('SocialSurveyQuestionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyQuestion.upsert({
        ...args,
        ...select,
      })
    },
  },
)
