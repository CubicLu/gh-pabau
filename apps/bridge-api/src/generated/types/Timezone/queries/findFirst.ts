import { queryField, list } from 'nexus'

export const TimezoneFindFirstQuery = queryField('findFirstTimezone', {
  type: 'Timezone',
  args: {
    where: 'TimezoneWhereInput',
    orderBy: list('TimezoneOrderByWithRelationInput'),
    cursor: 'TimezoneWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('TimezoneScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.findFirst({
      ...args,
      ...select,
    })
  },
})
