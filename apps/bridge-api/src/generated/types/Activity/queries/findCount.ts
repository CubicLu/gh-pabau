import { queryField, nonNull, list } from 'nexus'

export const ActivityFindCountQuery = queryField('findManyActivityCount', {
  type: nonNull('Int'),
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByWithRelationInput'),
    cursor: 'ActivityWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActivityScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.activity.count(args as any)
  },
})
