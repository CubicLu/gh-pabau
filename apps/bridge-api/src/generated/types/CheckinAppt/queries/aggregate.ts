import { queryField, list } from 'nexus'

export const CheckinApptAggregateQuery = queryField('aggregateCheckinAppt', {
  type: 'AggregateCheckinAppt',
  args: {
    where: 'CheckinApptWhereInput',
    orderBy: list('CheckinApptOrderByWithRelationInput'),
    cursor: 'CheckinApptWhereUniqueInput',
    distinct: 'CheckinApptScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinAppt.aggregate({ ...args, ...select }) as any
  },
})
