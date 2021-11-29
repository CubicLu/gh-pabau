import { queryField, nonNull, list } from 'nexus'

export const TimezoneFindManyQuery = queryField('findManyTimezone', {
  type: nonNull(list(nonNull('Timezone'))),
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByWithRelationInput'),
    cursor: 'TimezoneWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('TimezoneScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.findMany({
      ...args,
      ...select,
    })
  },
})
