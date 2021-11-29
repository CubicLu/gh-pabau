import { mutationField, nonNull } from 'nexus'

export const TimezoneUpdateManyMutation = mutationField('updateManyTimezone', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('TimezoneUpdateManyMutationInput'),
    where: 'TimezoneWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.timezone.updateMany(args as any)
  },
})
