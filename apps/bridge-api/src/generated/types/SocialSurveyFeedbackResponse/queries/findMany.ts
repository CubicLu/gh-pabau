import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyFeedbackResponseFindManyQuery = queryField(
  'findManySocialSurveyFeedbackResponse',
  {
    type: nonNull(list(nonNull('SocialSurveyFeedbackResponse'))),
    args: {
      where: 'SocialSurveyFeedbackResponseWhereInput',
      orderBy: list('SocialSurveyFeedbackResponseOrderByWithRelationInput'),
      cursor: 'SocialSurveyFeedbackResponseWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyFeedbackResponseScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyFeedbackResponse.findMany({
        ...args,
        ...select,
      })
    },
  },
)
