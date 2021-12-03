import { mutationField, nonNull } from 'nexus'

export const TimezoneUpdateOneMutation = mutationField('updateOneTimezone', {
  type: nonNull('Timezone'),
  args: {
    data: nonNull('TimezoneUpdateInput'),
    where: nonNull('TimezoneWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.timezone.update({
      where,
      data,
      ...select,
    })
  },
})
