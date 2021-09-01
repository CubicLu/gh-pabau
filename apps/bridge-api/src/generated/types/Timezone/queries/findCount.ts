import { queryField, nonNull, list } from 'nexus'

export const TimezoneFindCountQuery = queryField('findManyTimezoneCount', {
  type: nonNull('Int'),
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByWithRelationInput'),
    cursor: 'TimezoneWhereUniqueInput',
    distinct: 'TimezoneScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.timezone.count(args as any)
  },
})
