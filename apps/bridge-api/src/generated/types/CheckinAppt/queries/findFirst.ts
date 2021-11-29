import { queryField, list } from 'nexus'

export const CheckinApptFindFirstQuery = queryField('findFirstCheckinAppt', {
  type: 'CheckinAppt',
  args: {
    where: 'CheckinApptWhereInput',
    orderBy: list('CheckinApptOrderByWithRelationInput'),
    cursor: 'CheckinApptWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CheckinApptScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.checkinAppt.findFirst({
      ...args,
      ...select,
    })
  },
})
