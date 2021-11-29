import { mutationField, nonNull } from 'nexus'

export const JobUpdateManyMutation = mutationField('updateManyJob', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('JobUpdateManyMutationInput'),
    where: 'JobWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.job.updateMany(args as any)
  },
})
