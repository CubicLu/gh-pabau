import { queryField, list } from 'nexus'

export const AtQuestionFindFirstQuery = queryField('findFirstAtQuestion', {
  type: 'AtQuestion',
  args: {
    where: 'AtQuestionWhereInput',
    orderBy: list('AtQuestionOrderByWithRelationInput'),
    cursor: 'AtQuestionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtQuestionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuestion.findFirst({
      ...args,
      ...select,
    })
  },
})
