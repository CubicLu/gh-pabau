import { queryField, nonNull } from 'nexus'

export const AtConcernFindUniqueQuery = queryField('findUniqueAtConcern', {
  type: 'AtConcern',
  args: {
    where: nonNull('AtConcernWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.atConcern.findUnique({
      where,
      ...select,
    })
  },
})
