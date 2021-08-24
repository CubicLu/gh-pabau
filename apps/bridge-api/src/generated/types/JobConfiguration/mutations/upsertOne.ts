import { mutationField, nonNull } from 'nexus'

export const JobConfigurationUpsertOneMutation = mutationField(
  'upsertOneJobConfiguration',
  {
    type: nonNull('JobConfiguration'),
    args: {
      where: nonNull('JobConfigurationWhereUniqueInput'),
      create: nonNull('JobConfigurationCreateInput'),
      update: nonNull('JobConfigurationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.upsert({
        ...args,
        ...select,
      })
    },
  },
)
