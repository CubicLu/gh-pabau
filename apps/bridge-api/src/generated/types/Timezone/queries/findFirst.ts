import { queryField, list } from 'nexus'

export const TimezoneFindFirstQuery = queryField('findFirstTimezone', {
  type: 'Timezone',
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByInput'),
    cursor: 'TimezoneWhereUniqueInput',
    distinct: 'TimezoneScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.findFirst({
      ...args,
      ...select,
    })
  },
})
