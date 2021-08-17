import { queryField, nonNull } from 'nexus'

export const BugLogFindUniqueQuery = queryField('findUniqueBugLog', {
  type: 'BugLog',
  args: {
    where: nonNull('BugLogWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.bugLog.findUnique({
      where,
      ...select,
    })
  },
})
