import { mutationField, nonNull } from 'nexus'

export const JobConfigurationUpdateOneMutation = mutationField(
  'updateOneJobConfiguration',
  {
    type: nonNull('JobConfiguration'),
    args: {
      data: nonNull('JobConfigurationUpdateInput'),
      where: nonNull('JobConfigurationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.jobConfiguration.update({
        where,
        data,
        ...select,
      })
    },
  },
)
