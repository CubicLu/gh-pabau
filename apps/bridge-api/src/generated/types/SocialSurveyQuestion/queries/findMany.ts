import { queryField, nonNull, list } from 'nexus'

export const SocialSurveyQuestionFindManyQuery = queryField(
  'findManySocialSurveyQuestion',
  {
    type: nonNull(list(nonNull('SocialSurveyQuestion'))),
    args: {
      where: 'SocialSurveyQuestionWhereInput',
      orderBy: list('SocialSurveyQuestionOrderByWithRelationInput'),
      cursor: 'SocialSurveyQuestionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('SocialSurveyQuestionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.socialSurveyQuestion.findMany({
        ...args,
        ...select,
      })
    },
  },
)
