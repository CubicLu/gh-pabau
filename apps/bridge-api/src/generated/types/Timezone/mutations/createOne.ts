import { mutationField, nonNull } from 'nexus'

export const TimezoneCreateOneMutation = mutationField('createOneTimezone', {
  type: nonNull('Timezone'),
  args: {
    data: nonNull('TimezoneCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.timezone.create({
      data,
      ...select,
    })
  },
})
