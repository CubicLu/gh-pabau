import { queryField, list } from 'nexus'

export const TimezoneAggregateQuery = queryField('aggregateTimezone', {
  type: 'AggregateTimezone',
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByWithRelationInput'),
    cursor: 'TimezoneWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.aggregate({ ...args, ...select }) as any
  },
})
