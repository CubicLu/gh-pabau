import { queryField, list } from 'nexus'

export const PackageUsedAggregateQuery = queryField('aggregatePackageUsed', {
  type: 'AggregatePackageUsed',
  args: {
    where: 'PackageUsedWhereInput',
    orderBy: list('PackageUsedOrderByWithRelationInput'),
    cursor: 'PackageUsedWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.packageUsed.aggregate({ ...args, ...select }) as any
  },
})
