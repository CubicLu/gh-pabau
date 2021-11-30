import { queryField, nonNull, list } from 'nexus'

export const BugLogFindCountQuery = queryField('findManyBugLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByWithRelationInput'),
    cursor: 'BugLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BugLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.bugLog.count(args as any)
  },
})
