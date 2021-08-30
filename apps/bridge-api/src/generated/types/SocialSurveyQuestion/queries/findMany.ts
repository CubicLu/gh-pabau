import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyQuestionFindManyQuery = queryField(
  'findManySocialSurveyQuestion',
  {
    type: nonNull(list(nonNull('SocialSurveyQuestion'))),
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      orderBy: list('SocialSurveyQuestionOrderByInput'),
      cursor: 'SocialSurveyQuestionWhereUniqueInput',
      distinct: 'SocialSurveyQuestionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyQuestion.findMany({
        ...args,
        ...select,
      })
    },
  },
)
