import { queryField, nonNull, list } from 'nexus'

export const BugLogFindManyQuery = queryField('findManyBugLog', {
  type: nonNull(list(nonNull('BugLog'))),
  args: {
    where: 'BugLogWhereInput',
    orderBy: list('BugLogOrderByWithRelationInput'),
    cursor: 'BugLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BugLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.bugLog.findMany({
      ...args,
      ...select,
    })
  },
})
