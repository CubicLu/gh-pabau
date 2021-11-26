import { mutationField, nonNull } from 'nexus'

export const JobConfigurationUpdateManyMutation = mutationField(
  'updateManyJobConfiguration',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('JobConfigurationUpdateManyMutationInput'),
      where: 'JobConfigurationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.jobConfiguration.updateMany(args as any)
    },
  },
)
