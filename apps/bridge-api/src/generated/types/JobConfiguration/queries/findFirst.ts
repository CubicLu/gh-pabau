import { queryField, list } from 'nexus'

export const JobConfigurationFindFirstQuery = queryField(
  'findFirstJobConfiguration',
  {
    type: 'JobConfiguration',
    args: {
      where: 'JobConfigurationWhereInput',
      orderBy: list('JobConfigurationOrderByWithRelationInput'),
      cursor: 'JobConfigurationWhereUniqueInput',
      distinct: 'JobConfigurationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.jobConfiguration.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
