import { queryField, nonNull, list } from 'nexus'

export const CheckinApptFindManyQuery = queryField('findManyCheckinAppt', {
  type: nonNull(list(nonNull('CheckinAppt'))),
  args: {
    where: 'CheckinApptWhereInput',
    orderBy: list('CheckinApptOrderByWithRelationInput'),
    cursor: 'CheckinApptWhereUniqueInput',
    distinct: 'CheckinApptScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinAppt.findMany({
      ...args,
      ...select,
    })
  },
})
