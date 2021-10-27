import { queryField, nonNull } from 'nexus'

export const PathwayFindUniqueQuery = queryField('findUniquePathway', {
  type: 'Pathway',
  args: {
    where: nonNull('PathwayWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.pathway.findUnique({
      where,
      ...select,
    })
  },
})
