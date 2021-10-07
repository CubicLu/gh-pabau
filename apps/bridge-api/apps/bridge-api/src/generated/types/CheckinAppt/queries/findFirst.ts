import { queryField, list } from 'nexus'

export const CheckinApptFindFirstQuery = queryField('findFirstCheckinAppt', {
  type: 'CheckinAppt',
  args: {
    where: 'CheckinApptWhereInput',
    orderBy: list('CheckinApptOrderByWithRelationInput'),
    cursor: 'CheckinApptWhereUniqueInput',
    distinct: 'CheckinApptScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinAppt.findFirst({
      ...args,
      ...select,
    })
  },
})
