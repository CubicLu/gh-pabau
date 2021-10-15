import { queryField, nonNull, list } from 'nexus'

export const CheckinApptFindCountQuery = queryField(
  'findManyCheckinApptCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinApptWhereInput',
      orderBy: list('CheckinApptOrderByInput'),
      cursor: 'CheckinApptWhereUniqueInput',
      distinct: 'CheckinApptScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAppt.count(args as any)
    },
  },
)
