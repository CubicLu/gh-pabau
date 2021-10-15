import { queryField, nonNull, list } from 'nexus'

export const TimezoneFindManyQuery = queryField('findManyTimezone', {
  type: nonNull(list(nonNull('Timezone'))),
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByInput'),
    cursor: 'TimezoneWhereUniqueInput',
    distinct: 'TimezoneScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.findMany({
      ...args,
      ...select,
    })
  },
})
