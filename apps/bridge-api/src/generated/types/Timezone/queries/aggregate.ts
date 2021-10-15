import { queryField, list } from 'nexus'

export const TimezoneAggregateQuery = queryField('aggregateTimezone', {
  type: 'AggregateTimezone',
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByInput'),
    cursor: 'TimezoneWhereUniqueInput',
    distinct: 'TimezoneScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.aggregate({ ...args, ...select }) as any
  },
})
