import { queryField, nonNull } from 'nexus'

export const JobConfigurationFindUniqueQuery = queryField(
  'findUniqueJobConfiguration',
  {
    type: 'JobConfiguration',
    args: {
      where: nonNull('JobConfigurationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.jobConfiguration.findUnique({
        where,
        ...select,
      })
    },
  },
)
