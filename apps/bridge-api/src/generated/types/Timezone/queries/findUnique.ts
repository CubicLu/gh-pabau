import { queryField, nonNull } from 'nexus'

export const TimezoneFindUniqueQuery = queryField('findUniqueTimezone', {
  type: 'Timezone',
  args: {
    where: nonNull('TimezoneWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.timezone.findUnique({
      where,
      ...select,
    })
  },
})
