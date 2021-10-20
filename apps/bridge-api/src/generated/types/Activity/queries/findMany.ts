import { queryField, nonNull, list } from 'nexus'

export const ActivityFindManyQuery = queryField('findManyActivity', {
  type: nonNull(list(nonNull('Activity'))),
  args: {
    where: 'ActivityWhereInput',
    orderBy: list('ActivityOrderByWithRelationInput'),
    cursor: 'ActivityWhereUniqueInput',
    distinct: 'ActivityScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.activity.findMany({
      ...args,
      ...select,
    })
  },
})
