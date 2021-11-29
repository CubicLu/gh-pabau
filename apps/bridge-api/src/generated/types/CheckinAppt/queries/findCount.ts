import { queryField, nonNull, list } from 'nexus'

export const CheckinApptFindCountQuery = queryField(
  'findManyCheckinApptCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinApptWhereInput',
      orderBy: list('CheckinApptOrderByWithRelationInput'),
      cursor: 'CheckinApptWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinApptScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinAppt.count(args as any)
    },
  },
)
