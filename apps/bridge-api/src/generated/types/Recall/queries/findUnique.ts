import { queryField, nonNull } from 'nexus'

export const RecallFindUniqueQuery = queryField('findUniqueRecall', {
  type: 'Recall',
  args: {
    where: nonNull('RecallWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.recall.findUnique({
      where,
      ...select,
    })
  },
})
