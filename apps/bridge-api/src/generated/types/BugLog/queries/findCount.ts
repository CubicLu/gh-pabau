import { queryField, nonNull, list } from 'nexus'

export const BugLogFindCountQuery = queryField('findManyBugLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByWithRelationInput'),
    cursor: 'BugLogWhereUniqueInput',
    distinct: 'BugLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.bugLog.count(args as any)
  },
})
