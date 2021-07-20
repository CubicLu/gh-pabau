import { queryField, nonNull } from 'nexus'

export const CheckinApptFindUniqueQuery = queryField('findUniqueCheckinAppt', {
  type: 'CheckinAppt',
  args: {
    where: nonNull('CheckinApptWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.checkinAppt.findUnique({
      where,
      ...select,
    })
  },
})
