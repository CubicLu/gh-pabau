import { mutationField, nonNull } from 'nexus'

export const TimezoneUpdateOneMutation = mutationField('updateOneTimezone', {
  type: nonNull('Timezone'),
  args: {
    where: nonNull('TimezoneWhereUniqueInput'),
    data: nonNull('TimezoneUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.timezone.update({
      where,
      data,
      ...select,
    })
  },
})
