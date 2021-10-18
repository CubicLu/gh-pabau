import { queryField, nonNull } from 'nexus'

export const PathwaysFindUniqueQuery = queryField('findUniquePathways', {
  type: 'Pathways',
  args: {
    where: nonNull('PathwaysWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.pathways.findUnique({
      where,
      ...select,
    })
  },
})
