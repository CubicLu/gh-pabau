import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackResponseFindManyQuery = queryField(
  'findManySocialSurveyFeedbackResponse',
  {
    type: nonNull(list(nonNull('SocialSurveyFeedbackResponse'))),
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      distinct: 'SocialSurveyFeedbackResponseScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.findMany({
        ...args,
        ...select,
      })
    },
  },
)
