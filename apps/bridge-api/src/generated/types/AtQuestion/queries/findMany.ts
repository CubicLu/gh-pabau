import { queryField, nonNull, list } from 'nexus'

export const AtQuestionFindManyQuery = queryField('findManyAtQuestion', {
  type: nonNull(list(nonNull('AtQuestion'))),
  args: {
    where: 'AtQuestionWhereInput',
    orderBy: list('AtQuestionOrderByWithRelationInput'),
    cursor: 'AtQuestionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtQuestionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atQuestion.findMany({
      ...args,
      ...select,
    })
  },
})
