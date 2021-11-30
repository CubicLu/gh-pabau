import { queryField, list } from 'nexus'

export const BugLogFindFirstQuery = queryField('findFirstBugLog', {
  type: 'BugLog',
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByWithRelationInput'),
    cursor: 'BugLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BugLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bugLog.findFirst({
      ...args,
      ...select,
    })
  },
})
