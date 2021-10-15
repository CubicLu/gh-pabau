import { queryField, nonNull, list } from 'nexus'

export const AcLogFindCountQuery = queryField('findManyAcLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'AcLogWhereInput',
    orderBy: list('AcLogOrderByInput'),
    cursor: 'AcLogWhereUniqueInput',
    distinct: 'AcLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLog.count(args as any)
  },
})
