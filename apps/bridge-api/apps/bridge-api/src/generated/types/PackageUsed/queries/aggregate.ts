import { queryField, list } from 'nexus'

export const PackageUsedAggregateQuery = queryField('aggregatePackageUsed', {
  type: 'AggregatePackageUsed',
  args: {
    where: 'PackageUsedWhereInput',
    orderBy: list('PackageUsedOrderByWithRelationInput'),
    cursor: 'PackageUsedWhereUniqueInput',
    distinct: 'PackageUsedScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.packageUsed.aggregate({ ...args, ...select }) as any
  },
})
