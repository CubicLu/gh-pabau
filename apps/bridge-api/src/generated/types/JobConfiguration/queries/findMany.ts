import { queryField, nonNull, list } from 'nexus'

export const JobConfigurationFindManyQuery = queryField(
  'findManyJobConfiguration',
  {
    type: nonNull(list(nonNull('JobConfiguration'))),
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      distinct: 'JobConfigurationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.findMany({
        ...args,
        ...select,
      })
    },
  },
)
