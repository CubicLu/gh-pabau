import { queryField, nonNull } from 'nexus'

export const ActivityFindUniqueQuery = queryField('findUniqueActivity', {
  type: 'Activity',
  args: {
    where: nonNull('ActivityWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.activity.findUnique({
      where,
      ...select,
    })
  },
})
