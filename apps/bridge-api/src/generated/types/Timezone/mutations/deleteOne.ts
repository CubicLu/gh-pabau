import { mutationField, nonNull } from 'nexus'

export const TimezoneDeleteOneMutation = mutationField('deleteOneTimezone', {
  type: 'Timezone',
  args: {
    where: nonNull('TimezoneWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.timezone.delete({
      where,
      ...select,
    })
  },
})
