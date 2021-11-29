import { queryField, list } from 'nexus'

export const ActivityFindFirstQuery = queryField('findFirstActivity', {
  type: 'Activity',
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByWithRelationInput'),
    cursor: 'ActivityWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ActivityScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activity.findFirst({
      ...args,
      ...select,
    })
  },
})
