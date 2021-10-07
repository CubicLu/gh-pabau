import { mutationField, nonNull } from 'nexus'

export const TimezoneUpdateManyMutation = mutationField('updateManyTimezone', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'TimezoneWhereInput',
    data: nonNull('TimezoneUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.timezone.updateMany(args as any)
  },
})
