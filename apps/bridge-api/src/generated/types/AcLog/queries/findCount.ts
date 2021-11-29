import { queryField, nonNull, list } from 'nexus'

export const AcLogFindCountQuery = queryField('findManyAcLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'AcLogWhereInput',
    orderBy: list('AcLogOrderByWithRelationInput'),
    cursor: 'AcLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLog.count(args as any)
  },
})
