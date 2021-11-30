import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackFindManyQuery = queryField(
  'findManySocialSurveyFeedback',
  {
    type: nonNull(list(nonNull('SocialSurveyFeedback'))),
    args: {
      where: 'SocialSurveyFeedbackWhereInput',
      orderBy: list('SocialSurveyFeedbackOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyFeedbackScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedback.findMany({
        ...args,
        ...select,
      })
    },
  },
)
