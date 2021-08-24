import { queryField, nonNull } from 'nexus'

export const AcLogUrlFindUniqueQuery = queryField('findUniqueAcLogUrl', {
  type: 'AcLogUrl',
  args: {
    where: nonNull('AcLogUrlWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.acLogUrl.findUnique({
      where,
      ...select,
    })
  },
})
