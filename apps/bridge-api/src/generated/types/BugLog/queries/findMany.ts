import { queryField, nonNull, list } from 'nexus'

export const BugLogFindManyQuery = queryField('findManyBugLog', {
  type: nonNull(list(nonNull('BugLog'))),
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByInput'),
    cursor: 'BugLogWhereUniqueInput',
    distinct: 'BugLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bugLog.findMany({
      ...args,
      ...select,
    })
  },
})
