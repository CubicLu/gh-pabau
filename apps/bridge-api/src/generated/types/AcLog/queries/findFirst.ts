import { queryField, list } from 'nexus'

export const AcLogFindFirstQuery = queryField('findFirstAcLog', {
  type: 'AcLog',
  args: {
    where: 'AcLogWhereInput',
    orderBy: list('AcLogOrderByInput'),
    cursor: 'AcLogWhereUniqueInput',
    distinct: 'AcLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLog.findFirst({
      ...args,
      ...select,
    })
  },
})
