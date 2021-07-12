import { queryField, list } from 'nexus'

export const AtQuestionFindFirstQuery = queryField('findFirstAtQuestion', {
  type: 'AtQuestion',
  args: {
    where: 'AtQuestionWhereInput',
    orderBy: list('AtQuestionOrderByInput'),
    cursor: 'AtQuestionWhereUniqueInput',
    distinct: 'AtQuestionScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuestion.findFirst({
      ...args,
      ...select,
    })
  },
})
