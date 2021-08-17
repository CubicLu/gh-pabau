import { mutationField, nonNull } from 'nexus'

export const JobConfigurationUpdateOneMutation = mutationField(
  'updateOneJobConfiguration',
  {
    type: nonNull('JobConfiguration'),
    args: {
      where: nonNull('JobConfigurationWhereUniqueInput'),
      data: nonNull('JobConfigurationUpdateInput'),
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
