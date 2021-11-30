import { queryField, nonNull, list } from 'nexus'

export const CheckinApptFindManyQuery = queryField('findManyCheckinAppt', {
  type: nonNull(list(nonNull('CheckinAppt'))),
  args: {
    where: 'CheckinApptWhereInput',
    orderBy: list('CheckinApptOrderByWithRelationInput'),
    cursor: 'CheckinApptWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CheckinApptScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinAppt.findMany({
      ...args,
      ...select,
    })
  },
})
