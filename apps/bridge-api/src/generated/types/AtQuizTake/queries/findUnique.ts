import { queryField, nonNull } from 'nexus'

export const AtQuizTakeFindUniqueQuery = queryField('findUniqueAtQuizTake', {
  type: 'AtQuizTake',
  args: {
    where: nonNull('AtQuizTakeWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.atQuizTake.findUnique({
      where,
      ...select,
    })
  },
})
