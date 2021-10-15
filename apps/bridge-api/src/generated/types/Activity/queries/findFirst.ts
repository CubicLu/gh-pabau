import { queryField, list } from 'nexus'

export const ActivityFindFirstQuery = queryField('findFirstActivity', {
  type: 'Activity',
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByInput'),
    cursor: 'ActivityWhereUniqueInput',
    distinct: 'ActivityScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activity.findFirst({
      ...args,
      ...select,
    })
  },
})
