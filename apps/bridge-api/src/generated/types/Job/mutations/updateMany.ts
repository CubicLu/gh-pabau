import { mutationField, nonNull } from 'nexus'

export const JobUpdateManyMutation = mutationField('updateManyJob', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'JobWhereInput',
    data: nonNull('JobUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.job.updateMany(args as any)
  },
})
