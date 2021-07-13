import { queryField, nonNull } from 'nexus'

export const AcLogFindUniqueQuery = queryField('findUniqueAcLog', {
  type: 'AcLog',
  args: {
    where: nonNull('AcLogWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.acLog.findUnique({
      where,
      ...select,
    })
  },
})
