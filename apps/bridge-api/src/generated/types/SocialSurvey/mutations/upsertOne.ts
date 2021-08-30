import { mutationField, nonNull } from 'nexus'

export const SocialSurveyUpsertOneMutation = mutationField(
  'upsertOneSocialSurvey',
  {
    type: nonNull('SocialSurvey'),
    args: {
      where: nonNull('SocialSurveyWhereUniqueInput'),
      create: nonNull('SocialSurveyCreateInput'),
      update: nonNull('SocialSurveyUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurvey.upsert({
        ...args,
        ...select,
      })
    },
  },
)
