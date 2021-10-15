import { queryField, nonNull, list } from 'nexus'

export const ActivityFindCountQuery = queryField('findManyActivityCount', {
  type: nonNull('Int'),
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByInput'),
    cursor: 'ActivityWhereUniqueInput',
    distinct: 'ActivityScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.activity.count(args as any)
  },
})
