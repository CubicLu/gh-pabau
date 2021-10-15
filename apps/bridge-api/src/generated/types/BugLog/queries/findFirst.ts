import { queryField, list } from 'nexus'

export const BugLogFindFirstQuery = queryField('findFirstBugLog', {
  type: 'BugLog',
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByInput'),
    cursor: 'BugLogWhereUniqueInput',
    distinct: 'BugLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bugLog.findFirst({
      ...args,
      ...select,
    })
  },
})
