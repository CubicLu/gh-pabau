import { mutationField, nonNull } from 'nexus'

export const TimezoneUpsertOneMutation = mutationField('upsertOneTimezone', {
  type: nonNull('Timezone'),
  args: {
    where: nonNull('TimezoneWhereUniqueInput'),
    create: nonNull('TimezoneCreateInput'),
    update: nonNull('TimezoneUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.timezone.upsert({
      ...args,
      ...select,
    })
  },
})
