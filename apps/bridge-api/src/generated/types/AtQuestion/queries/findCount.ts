import { queryField, nonNull, list } from 'nexus'

export const AtQuestionFindCountQuery = queryField('findManyAtQuestionCount', {
  type: nonNull('Int'),
  args: {
    where: 'AtQuestionWhereInput',
    orderBy: list('AtQuestionOrderByWithRelationInput'),
    cursor: 'AtQuestionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtQuestionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atQuestion.count(args as any)
  },
})
