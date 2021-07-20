import { queryField, nonNull } from 'nexus'

export const SocialSurveyFindUniqueQuery = queryField(
  'findUniqueSocialSurvey',
  {
    type: 'SocialSurvey',
    args: {
      where: nonNull('SocialSurveyWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.socialSurvey.findUnique({
        where,
        ...select,
      })
    },
  },
)
