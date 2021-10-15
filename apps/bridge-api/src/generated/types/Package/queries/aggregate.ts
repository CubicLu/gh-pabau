import { queryField, list } from 'nexus'

export const PackageAggregateQuery = queryField('aggregatePackage', {
  type: 'AggregatePackage',
  args: {
    where: 'PackageWhereInput',
    orderBy: list('PackageOrderByInput'),
    cursor: 'PackageWhereUniqueInput',
    distinct: 'PackageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.package.aggregate({ ...args, ...select }) as any
  },
})
