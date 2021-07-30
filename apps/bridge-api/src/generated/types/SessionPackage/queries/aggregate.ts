import { queryField, list } from 'nexus'

export const SessionPackageAggregateQuery = queryField(
  'aggregateSessionPackage',
  {
    type: 'AggregateSessionPackage',
    args: {
      where: 'SessionPackageWhereInput',
      orderBy: list('SessionPackageOrderByInput'),
      cursor: 'SessionPackageWhereUniqueInput',
      distinct: 'SessionPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.sessionPackage.aggregate({ ...args, ...select }) as any
    },
  },
)
